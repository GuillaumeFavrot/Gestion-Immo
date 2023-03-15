from backend.exts import db
from datetime import date
from backend.application.utilities.id_generator import id_gen
from backend.application.models.enums.enums import Inventory_type

class Inventory(db.Model):
    """Inventory data strcture"""
    id = db.Column(db.String(255), primary_key=True)
    apartment_id = db.Column(db.String(255), unique=False)
    tenant_id = db.Column(db.String(255), unique=False)
    date = db.Column(db.Date, unique=False)
    type = db.Column(db.String(255), unique=False)
    remarks = db.Column(db.String(1000), unique=False)
    
    def __init__(
            self,
            apartment_id: str,
            tenant_id: str,
            date: date,
            type: Inventory_type,
            remarks: str,
            id: str = id_gen()
        ) -> None:
        self.apartment_id = apartment_id
        self.tenant_id = tenant_id
        self.date = date
        self.type = type
        self.remarks = remarks
        self.id = id

    def update_inventory(self, new_remarks:str) -> None:
        """Updates the inventory. Needs some remarks."""
        setattr(self, "remarks", new_remarks)
