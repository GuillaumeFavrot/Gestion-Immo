from dataclasses import dataclass
from datetime import date, datetime
from utilities.id_generator import id_gen

from models.tenant import Tenant
from models.bill import Bill, Deposit_bill
from models.enums.enums import Apartment_fiancial_data

@dataclass
class Apartment:
    """Apartment data structure"""
    address_1: str
    address_2: str
    zipcode: str
    city: str
    monthly_charges: float
    monthly_rent: float
    deposit: float
    in_management: bool
    management_fees: float = 0
    id: str = id_gen()
    current_tenant_id: str = ""
    current_tenant_entry_date: date = datetime.now()

    def __post_init__(self):
        if self.in_management == True:
            self.management_fees = self.monthly_rent / 100 * 8

    def update_apartment_financial_data(self, data_type: Apartment_fiancial_data, new_data: float) -> None:
        """Updates an appartment's financial data. Needs an Apartment,  the type of data to update, a lastname, the new piece of information."""
        setattr(self, data_type.value, new_data)
    
    def delete_apartment(self) -> None:
        """Deletes an apartment from the DB. Needs an apartment"""
        return "Apartment deleted"

    def assign_new_tenant(self, tenant: Tenant, entry_date: date) -> None:
        setattr(self, "current_tenant_id", tenant.id)
        setattr(self, "current_tenant_entry_date", entry_date)
    
    def remove_tenant(self) -> None:
        setattr(self, "current_tenant_id", "")
        setattr(self, "current_tenant_entry_date", datetime.now())
