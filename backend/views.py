#!/bin/python

from flask import Blueprint, send_from_directory, request
from backend.exts import db
# from backend.models.messages import Message
# from backend.schemas.messageSchema import messages_schema
from backend.application.models.tenant import Tenant
import backend.config as config

#Creation of the blueprint

routes = Blueprint('route', __name__)


# Main routes setup

# This route serves the frontend of the app

@routes.route("/")
def index():
    return send_from_directory(config.static_folder_path, 'index.html')




# CRUD routes
 
# Create a message

@routes.route("/api/tenants", methods=['POST'])
def create_tenant():
    print(request)
    data = request.json
    print(data)
    # new_message = Message(message)

    tenant = Tenant(
        firstname=data["firstname"],
        lastname=data["lastname"],
        email=data["email"],
        caf_payment=data["caf_payment"],
        apl_amount=data["apl_amount"]
    )
    print(tenant)
    # db.session.add(new_message)
    # db.session.commit()

    # messages = Message.query.all()

    return ""

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