#!/bin/python
from dataclasses import dataclass
from backend.application.models.enums.enums import Tenant_data_type
from backend.application.utilities.id_generator import id_gen

@dataclass
class Tenant :
    """Tenant data-structure"""
    firstname: str
    lastname: str
    email: str
    caf_payment: bool
    id: str = id_gen()
    apl_amount: float = 0
 
    def update_tenant_data(self, data_type: Tenant_data_type, new_data) -> None:
        """Updates a tenant's data. Needs a tenant, the data to modify and a new piece of data."""
        setattr(self, data_type.value, new_data)
    
    def delete_tenant(self) -> None:
        """Deletes a tenant from the DB. Needs a tenant"""
        return "Tenant deleted"
