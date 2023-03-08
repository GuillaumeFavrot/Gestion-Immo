from datetime import date
from utilities.id_generator import id_gen

from models.apartment import Apartment
from models.tenant import Tenant
from models.bill import Deposit_bill

def tenant_assignment(apartment: Apartment, tenant: Tenant, entry_date: date):
    """Handles the assignment process of a tenant to an apartment"""
    
    if apartment.current_tenant_id == tenant.id:
        return "Error: This tenant has already been assigned to this apartment"
    
    apartment.assign_new_tenant(tenant=tenant, entry_date=entry_date)

    deposit_bill = Deposit_bill(
            id=id_gen(),
            apartment_id=apartment.id,
            tenant_id=tenant.id,
            deposit_amount=apartment.deposit
        )

    return deposit_bill