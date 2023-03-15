from backend.exts import db
from datetime import date, datetime

from backend.application.models.tenant import Tenant
from backend.application.models.enums.enums import Apartment_fiancial_data

class Apartment(db.Model):
    """Apartment data structure"""
    id = db.Column(db.String(255), primary_key=True)
    address_1 = db.Column(db.String(255), unique=False)
    address_2 = db.Column(db.String(255), unique=False)
    zipcode = db.Column(db.String(255), unique=False)
    city = db.Column(db.String(255), unique=False)
    monthly_charges = db.Column(db.Float, unique=False)
    monthly_rent = db.Column(db.Float, unique=False)
    deposit = db.Column(db.Float, unique=False)
    in_management = db.Column(db.Boolean, unique=False)
    management_fees = db.Column(db.Float, unique=False)
    current_tenant_id = db.Column(db.String(255), unique=False)
    current_tenant_entry_date = db.Column(db.Date, unique=False)

    def __init__(
            self, 
            id: str,  
            address_1: str,
            address_2: str,
            zipcode: str,
            city: str,
            monthly_charges: float,
            monthly_rent: float,
            deposit: float,
            in_management: bool = False,
            current_tenant_id: str = "",
            current_tenant_entry_date: str = datetime.now()
        ) -> None:
        self.address_1 = address_1
        self.address_2 = address_2
        self.zipcode = zipcode
        self.city = city
        self.monthly_charges = monthly_charges
        self.monthly_rent = monthly_rent
        self.deposit = deposit
        self.in_management = in_management
        self.management_fees = self.monthly_rent / 100 * 8
        self.id = id
        self.current_tenant_id = current_tenant_id
        self.current_tenant_entry_date = current_tenant_entry_date

    def update_apartment_financial_data(self, data_type: Apartment_fiancial_data, new_data: float) -> None:
        """Updates an appartment's financial data. Needs an Apartment,  the type of data to update, a lastname, the new piece of information."""
        setattr(self, data_type.value, new_data)

    def assign_new_tenant(self, tenant: Tenant, entry_date: date) -> None:
        setattr(self, "current_tenant_id", tenant.id)
        setattr(self, "current_tenant_entry_date", entry_date)
    
    def remove_tenant(self) -> None:
        setattr(self, "current_tenant_id", "")
        setattr(self, "current_tenant_entry_date", datetime.now())