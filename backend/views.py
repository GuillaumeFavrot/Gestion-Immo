#!/bin/python

from flask import Blueprint, send_from_directory, request
from backend.exts import db
from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment

from backend.schemas.tenant_schema import tenants_schema
from backend.schemas.apartment_schema import apartments_schema
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

# Delete a tenant
@routes.route("/api/tenants", methods=['DELETE'])
def delete_tenant():

    id = request.json['id']

    tenant = Tenant.query.get(id)

    db.session.delete(tenant)
    db.session.commit()

    tenants = Tenant.query.all()

    return tenants_schema.dump(tenants)

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
        address_2 = data['address_1'],
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

# Delete an apartment
@routes.route("/api/apartments", methods=['DELETE'])
def delete_apartment():

    id = request.json['id']

    apartment = Apartment.query.get(id)

    db.session.delete(apartment)
    db.session.commit()

    apartments = Tenant.query.all()

    return tenants_schema.dump(apartments)

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