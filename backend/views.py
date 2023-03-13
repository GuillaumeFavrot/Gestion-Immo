#!/bin/python

from flask import Blueprint, send_from_directory, request
from backend.exts import db
from backend.application.models.tenant import Tenant
from backend.schemas.tenant_schema import tenants_schema
import backend.config as config

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

## @/api/apartments
# Get all apartments


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