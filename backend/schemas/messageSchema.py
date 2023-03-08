#!/bin/python

from marshmallow import Schema, fields

# Message Schema

class MessageSchema(Schema):
    _id = fields.Int()
    message = fields.Str()

# Schema initialization

message_schema = MessageSchema()
messages_schema = MessageSchema(many = True) 