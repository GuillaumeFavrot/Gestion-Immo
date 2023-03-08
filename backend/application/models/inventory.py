#!/bin/python
from dataclasses import dataclass
from datetime import date
from utilities.id_generator import id_gen

from models.enums.enums import Inventory_type

@dataclass
class Inventory:
    """Inventory data strcture"""
    apartment_id: str
    tenant_id: str
    date: date
    type: Inventory_type
    remarks: str
    id: str = id_gen()

    def update_inventory(self, new_remarks:str) -> None:
        """Updates the inventory. Needs some remarks."""
        setattr(self, "remarks", new_remarks)
    
    def delete_inventory(self) -> None:
        """Deletes the inventory from the DB."""
        return "Inventory deleted"
