#!/bin/python
from backend.exts import db
from dataclasses import dataclass
from backend.application.models.enums.enums import Tenant_data_type
from backend.application.utilities.id_generator import id_gen

@dataclass
class Tenant(db.Model) :
    """Tenant data-structure"""
    firstname = db.Column(db.String(255), unique=False)
    lastname = db.Column(db.String(255), unique=False)
    email = db.Column(db.String(255), unique=False)
    caf_payment = db.Column(db.Boolean, unique=False, default=False)
    id = db.Column(db.String(255), primary_key=True, default=id_gen())
    apl_amount = db.Column(db.Float, unique=False, default=0)
 
    def update_tenant_data(self, data_type: Tenant_data_type, new_data) -> None:
        """Updates a tenant's data. Needs a tenant, the data to modify and a new piece of data."""
        setattr(self, data_type.value, new_data)
    
    def delete_tenant(self) -> None:
        """Deletes a tenant from the DB. Needs a tenant"""
        return "Tenant deleted"
