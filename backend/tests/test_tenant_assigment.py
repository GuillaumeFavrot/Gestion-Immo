from datetime import datetime

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment

from backend.application.main_logic.tenant_assignment import tenant_assignment

from backend.application.models.bill import Deposit_bill

a = Apartment(
        id="Test_id",
        address_1="12 rue du marais",
        address_2="",
        zipcode="67000",
        city="Strasbourg",
        monthly_charges=50,
        monthly_rent=600,
        deposit=650,
        in_management=True,
    )

l = Tenant(
        id="Test_id",
        firstname="Antoine",
        lastname="Dupont",
        email="gui.favrot@gmail.com",
        caf_payment=False
    )

d = datetime.now()

#Test tenant assignment success
def test_tenant_assignment_success() -> None:
    """Checks that the tenant assignment function runs properly if provided with the appropriate arguments"""
    test = tenant_assignment(tenant=l, apartment=a, entry_date=d)
    assert type(test) == Deposit_bill

#Test tenant assignment failure
def test_tenant_assignment_failure_tenant_already_assigned() -> None:
    """Checks that the rent_bill creator function fails if the tenant is already assigned to the apartment"""
    a = Apartment(
        id="Test_id",
        address_1="12 rue du marais",
        address_2="",
        zipcode="67000",
        city="Strasbourg",
        monthly_charges=50,
        monthly_rent=600,
        deposit=650,
        in_management=True,
        current_tenant_id="Test_id"
    )
    test = tenant_assignment(tenant=l, apartment=a, entry_date=d)
    assert test == "Error: This tenant has already been assigned to this apartment"