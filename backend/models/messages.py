#!/bin/python

from backend.exts import db
#from backend.app import db

class Message(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), unique=False)

    def __init__(self, message):
        self.message = message