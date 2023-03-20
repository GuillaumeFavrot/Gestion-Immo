from pandas import DataFrame

from backend.application.utilities.id_generator import id_gen

from backend.application.models.apartment import Apartment
from backend.application.models.tenant import Tenant
from backend.application.models.bill import Rent_bill

def rent_bill_creator(tenant: Tenant, apartment: Apartment, period: str, former_rents: DataFrame):
    """Handles the creation process of a rent bill"""
    if former_rents.shape[0] > 0 :
        if period in former_rents.period.values:
            return "A bill has already been created for this tenant on this period"

    return Rent_bill(
        id=id_gen(),
        tenant_id=tenant.id,
        apartment_id=apartment.id,
        rent_amount=apartment.monthly_rent,
        charges=apartment.monthly_charges,
        management_fees=apartment.management_fees,
        period=period
    )
