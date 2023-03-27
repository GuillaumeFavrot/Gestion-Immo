from datetime import datetime
import pandas as pd
from sqlalchemy import or_

from flask import Blueprint, send_from_directory, request
from backend.exts import db
from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.bill import Deposit_bill, Rent_bill
from backend.application.models.inventory import Inventory
from backend.application.models.enums.enums import Tenant_data_type, Apartment_fiancial_data

from backend.application.main_logic.tenant_assignment import tenant_assignment
from backend.application.main_logic.rent_bill_creator import rent_bill_creator
from backend.application.main_logic.payment_processor import payment_processor
from backend.application.main_logic.departure_processor import departure_processor
from backend.application.main_logic.receipt_processor import receipt_processor

from backend.schemas.tenant_schema import tenants_schema, tenant_schema, extended_tenant_schema
from backend.schemas.apartment_schema import apartments_schema, apartment_schema
from backend.schemas.bill_schema import deposit_bills_schema, rent_bills_schema, rent_bill_schema, deposit_bill_schema
from backend.schemas.inventory_schema import inventories_schema

import backend.config as config

from backend.application.utilities.id_generator import id_gen


#Creation of the blueprint

routes = Blueprint('route', __name__)

# Main routes setup

# This route serves the frontend of the app

@routes.route("/")
def index():
    return send_from_directory(config.static_folder_path, 'index.html')


### CRUD routes

## @/api/tenants 

# Get all tenants
@routes.route("/api/tenants", methods=['GET'])
def get_tenants():
    data = "".join(list(str(request.query_string))[7:-1:])
    print(data)
    if data == "":
        tenants = Tenant.query.all()
    else :
        print(data)
        tenants = Tenant.query.filter(or_(Tenant.lastname.contains(data), Tenant.firstname.contains(data), Tenant.id.contains(data))).all()
    return tenants_schema.dump(tenants)

# Create a Tenant
@routes.route("/api/tenants", methods=['POST'])
def create_tenant():
    data = request.json
    tenant = Tenant(
        id = id_gen(),
        firstname=data["firstname"],
        lastname=data["lastname"],
        email=data["email"],
        caf_payment=data["caf_payment"],
        apl_amount=data["apl_amount"]
    )
    db.session.add(tenant)
    db.session.commit()
    tenants = Tenant.query.all()
    return tenants_schema.dump(tenants)

## @/api/tenant
# Get a tenant
@routes.route("/api/tenant", methods=['POST'])
def get_tenant():
    id = request.json
    tenant = Tenant.query.get(id)
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == id).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == id).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == id).all())
    return extended_tenant_schema.dump(tenant)

# Update a tenant data
@routes.route("/api/tenant", methods=['PUT'])
def update_tenant_data():
    data = request.json
    tenant = Tenant.query.get(data['tenant_id'])
    
    data_type = ""
    if data['data_type'] == "firstname" :
        data_type = Tenant_data_type.FIRSTNAME
    if data['data_type'] == "lastname":
        data_type = Tenant_data_type.LASTNAME
    if data['data_type'] == "email":
        data_type = Tenant_data_type.EMAIL
    if data['data_type'] == "caf_payment":
        data_type = Tenant_data_type.CAF_PAYMENT
    if data['data_type'] == "apl_amount":
        data_type = Tenant_data_type.APL_AMOUNT

    tenant.update_tenant_data(data_type=data_type, new_data=data['new_data'])
    db.session.commit()

    tenant = Tenant.query.get(data['tenant_id'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant_id']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant_id']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant_id']).all())
    return extended_tenant_schema.dump(tenant)

# Delete a tenant
@routes.route("/api/tenant", methods=['DELETE'])
def delete_tenant():
    id = request.json['id']
    tenant = Tenant.query.get(id)
    db.session.delete(tenant)
    db.session.commit()
    tenants = Tenant.query.all()
    return tenants_schema.dump(tenants)

## @/api/tenant/bill
#Create a new rent bill
@routes.route("/api/tenant/bill", methods=['POST'])
def create_rent_bill():
    data = request.json
    tenant = Tenant.query.get(data['tenant_id'])
    apartment = Apartment.query.get(data['apartment_id'])
    former_rents = pd.DataFrame(rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id'], Rent_bill.tenant_id == data['tenant_id']).all()))
    rent_bill = rent_bill_creator(tenant=tenant, apartment=apartment, period=data['period'], former_rents=former_rents)
    db.session.add(rent_bill)
    db.session.commit()
    tenant = Tenant.query.get(data['tenant_id'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant_id']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant_id']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant_id']).all())
    return extended_tenant_schema.dump(tenant)

#Pay a bill
@routes.route("/api/tenant/bill", methods=['PUT'])
def pay_bill():
    data = request.json
    tenant = Tenant.query.get(data['tenant'])
    bill = ""
    if data['type'] == "deposit":
        bill = Deposit_bill.query.get(data['bill'])
    else :
        bill = Rent_bill.query.get(data['bill'])
    payment_processor(tenant=tenant, bill=bill, paid_amount=float(data['paid_amount']))
    db.session.commit()
    tenant = Tenant.query.get(data['tenant'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant']).all())

    return extended_tenant_schema.dump(tenant)

#Receipt processing
@routes.route("/api/tenant/receipt", methods=['POST'])
def get_receipt():
    print("request")
    data = request.json
    tenant = Tenant.query.get(data['tenant_id'])
    apartment = Apartment.query.get(data['apartment_id'])
    rents = pd.DataFrame(rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id'], Rent_bill.tenant_id == data['tenant_id']).all()))
    response = receipt_processor(tenant=tenant, apartment=apartment, rents=rents, requested_period=data['period'], pdf=False)
    tenant = Tenant.query.get(data['tenant_id'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant_id']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant_id']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant_id']).all())
    return extended_tenant_schema.dump(tenant)


## @/api/apartments
# Get all apartments
@routes.route("/api/apartments", methods=['GET'])
def get_apartments():
    print(str(request.query_string))
    data = "".join(list(str(request.query_string))[7:-1:])
    print(data)
    if data == "":
        apartments = Apartment.query.all()
    else :
        apartments = Apartment.query.filter(or_(Apartment.address_1.contains(data), Apartment.address_2.contains(data), Apartment.id.contains(data))).all()
    return apartments_schema.dump(apartments)

# Create an apartment
@routes.route("/api/apartments", methods=['POST'])
def create_apartment():
    data = request.json
    apartment = Apartment(
        id = id_gen(),
        address_1 = data['address_1'],
        address_2 = data['address_2'],
        zipcode = data['zipcode'],
        city = data['city'],
        monthly_charges = data['monthly_charges'],
        monthly_rent = data['monthly_rent'],
        deposit = data['deposit'],
        in_management = data['in_management'],
    )
    db.session.add(apartment)
    db.session.commit()
    apartments = Apartment.query.all()
    return apartments_schema.dump(apartments)

## @/api/apartment
# Get an apartment
@routes.route("/api/apartment", methods=['POST'])
def get_apartment():
    id = request.json
    apartment = Apartment.query.get(id)
    if len(apartment.__dict__['current_tenant_id']) > 0 :
        apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == apartment.__dict__['current_tenant_id']).one())
    else :
        apartment.tenant = {}
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == id).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == id).all())
    apartment.inventories =  inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == id).all())
    return apartment_schema.dump(apartment)

# Update an partment data
@routes.route("/api/apartment", methods=['PUT'])
def update_apartment_data():
    data = request.json
    apartment = Apartment.query.get(data['apartment_id'])
    
    data_type = ""
    if data['data_type'] == "monthly_charges" :
        data_type = Apartment_fiancial_data.CHARGES
    if data['data_type'] == "monthly_rent":
        data_type = Apartment_fiancial_data.RENT
    if data['data_type'] == "deposit":
        data_type = Apartment_fiancial_data.DEPOSIT

    apartment.update_apartment_financial_data(data_type=data_type, new_data=data['new_data'])
    db.session.commit()

    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == apartment.__dict__['current_tenant_id']).all())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories  = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)

# Delete an apartment
@routes.route("/api/apartment", methods=['DELETE'])
def delete_apartment():
    id = request.json['id']
    apartment = Apartment.query.get(id)
    db.session.delete(apartment)
    db.session.commit()
    apartments = Apartment.query.all()
    print()
    return apartments_schema.dump(apartments)

# Assign a tenant to an apartment
@routes.route("/api/apartment/assignment", methods=['PUT'])
def assign_tenant():
    data = request.json
    apartment = Apartment.query.get(data['apartment_id'])
    tenant = Tenant.query.get(data['tenant_id'])
    depostit_bill = tenant_assignment(apartment=apartment, tenant=tenant, entry_date=datetime.now())
    db.session.add(depostit_bill)
    db.session.commit()
    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == apartment.__dict__['current_tenant_id']).one())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories  = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)

# Unassign a tenant from an apartment
@routes.route("/api/apartment/unassignment", methods=['PUT'])
def unassign_tenant():
    data = request.json
    apartment = Apartment.query.get(data['apartment_id'])
    tenant = Tenant.query.get(data['tenant_id'])
    rents = pd.DataFrame(rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id'], Rent_bill.tenant_id == data['tenant_id']).all()))
    deposit_bill = Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id'], Deposit_bill.tenant_id == data['tenant_id'], Deposit_bill.status == "active").one()
    result = departure_processor(tenant=tenant, apartment=apartment, rents=rents, deposit_bill=deposit_bill, pdf=False)
    db.session.commit()
    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == data['tenant_id']).one())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories  = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)


## @/api/apartment
# Create an inventory
@routes.route("/api/apartment/inventory", methods=['POST'])
def create_inventory():
    data = request.json
    raw_date = data['date']
    py_date = datetime.strptime(raw_date, "%Y-%m-%d")
    print(py_date, type(py_date))
    inventory = Inventory(
        apartment_id=data['apartment_id'],
        tenant_id=data['tenant_id'],
        date=py_date,
        type=data['inventory_type'],
        remarks=data['remarks'],
        id=id_gen()
    )
    db.session.add(inventory)
    db.session.commit()
    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == apartment.__dict__['current_tenant_id']).one())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)

# Modify an inventory
@routes.route("/api/apartment/inventory", methods=['PUT'])
def modify_inventory():
    data = request.json
    inventory = Inventory.query.get(data['id'])
    inventory.update_inventory(new_remarks=data['remarks'])
    db.session.add(inventory)
    db.session.commit()
    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == data['tenant_id']).one())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)

# Delete an inventory
@routes.route("/api/apartment/inventory", methods=['DELETE'])
def delete_inventory():
    data = request.json
    inventory = Inventory.query.get(data['id'])
    db.session.delete(inventory)
    db.session.commit()
    apartment = Apartment.query.get(data['apartment_id'])
    apartment.tenant = tenant_schema.dump(Tenant.query.filter(Tenant.id == apartment.__dict__['current_tenant_id']).one())
    apartment.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.apartment_id == data['apartment_id']).all())
    apartment.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.apartment_id == data['apartment_id']).all())
    apartment.inventories = inventories_schema.dump(Inventory.query.filter(Inventory.apartment_id == data['apartment_id']).all())
    return apartment_schema.dump(apartment)