from datetime import datetime
import pandas as pd

from flask import Blueprint, send_from_directory, request
from backend.exts import db
from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.bill import Deposit_bill, Rent_bill

from backend.application.main_logic.tenant_assignment import tenant_assignment
from backend.application.main_logic.rent_bill_creator import rent_bill_creator
from backend.application.main_logic.payment_processor import payment_processor

from backend.schemas.tenant_schema import tenants_schema, tenant_schema, extended_tenant_schema
from backend.schemas.apartment_schema import apartments_schema, apartment_schema
from backend.schemas.bill_schema import deposit_bills_schema, rent_bills_schema, rent_bill_schema, deposit_bill_schema

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
    tenants = Tenant.query.all()
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
    former_rents = pd.DataFrame(rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant_id']).all()))
    rent_bill = rent_bill_creator(tenant=tenant, apartment=apartment, period=data['period'], former_rents=former_rents)
    db.session.add(rent_bill)
    db.session.commit()
    tenant = Tenant.query.get(data['tenant_id'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant_id']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant_id']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant_id']).all())
    return extended_tenant_schema.dump(tenant)

#Create a new rent bill
@routes.route("/api/tenant/bill", methods=['PUT'])
def pay_bill():
    data = request.json
    print(data)
    tenant = Tenant.query.get(data['tenant'])
    bill = ""
    if data['type'] == "deposit":
        bill = Deposit_bill.query.get(data['bill'])
    else :
        bill = Rent_bill.query.get(data['bill'])
    print(type(bill))
    payment_processor(tenant=tenant, bill=bill, paid_amount=float(data['paid_amount']))
    db.session.commit()
    tenant = Tenant.query.get(data['tenant'])
    tenant.apartments = apartments_schema.dump(Apartment.query.filter(Apartment.current_tenant_id == data['tenant']).all())
    tenant.deposit_bills = deposit_bills_schema.dump(Deposit_bill.query.filter(Deposit_bill.tenant_id == data['tenant']).all())
    tenant.rent_bills = rent_bills_schema.dump(Rent_bill.query.filter(Rent_bill.tenant_id == data['tenant']).all())
    return extended_tenant_schema.dump(tenant)







## @/api/apartments
# Get all apartments
@routes.route("/api/apartments", methods=['GET'])
def get_apartments():
    apartments = Apartment.query.all()
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
    return apartment_schema.dump(apartment)

# Delete an apartment
@routes.route("/api/apartment", methods=['DELETE'])
def delete_apartment():
    id = request.json['id']
    apartment = Apartment.query.get(id)
    db.session.delete(apartment)
    db.session.commit()
    apartments = Tenant.query.all()
    return apartment_schema.dump(apartments)

# Assign a tenant to an apartment
@routes.route("/api/apartment", methods=['PUT'])
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
    return apartment_schema.dump(apartment)

#Get all messages

# @routes.route("/api/tenant", methods=['GET'])
# def get_messages():

#     messages = Message.query.all()

#     return messages_schema.dump(messages)

# # Update a message

# @routes.route("/api/test", methods=['PUT'])
# def update_message():

#     newMessage = request.json['message']
#     id = request.json['id']

#     message = Message.query.get(id)

#     message.message = newMessage

#     db.session.commit()

#     messages = Message.query.all()

#     return messages_schema.dump(messages)

# # Delete a message

# @routes.route("/api/test", methods=['DELETE'])
# def delete_message():

#     id = request.json['id']

#     message = Message.query.get(id)

#     db.session.delete(message)
#     db.session.commit()

#     messages = Message.query.all()

#     return messages_schema.dump(messages)