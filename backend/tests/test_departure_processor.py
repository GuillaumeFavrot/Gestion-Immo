import pandas as pd

from backend.application.utilities.id_generator import id_gen

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.bill import Rent_bill

from backend.application.main_logic.departure_processor import *

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

l = Tenant(
        id="Test_id",
        firstname="Antoine",
        lastname="Dupont",
        email="gui.favrot@gmail.com",
        caf_payment=False
    )

bill = Rent_bill(
        id=id_gen(),
        tenant_id="Test_id",
        apartment_id="Test_id",
        rent_amount=a.monthly_rent,
        charges=a.monthly_charges,
        management_fees=a.management_fees,
        paid=False,
        period="january_2023"
    )

bill = bill.__dict__

#Tests the departure process success
def test_departure_processor_success() -> None:
    """Checks the success of the depature processor function if provided with appropriate arguments"""
    test = departure_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Departure successfuly processed"

#Tests input type errors
def test_departure_processor_bad_tenant_failure() -> None:
    """Checks the failure of the depature processor function if provided with a string instead of a tenant"""
    test = departure_processor(tenant="test", apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: incorrect tenant argument"

def test_departure_processor_bad_apartment_failure() -> None:
    """Checks the failure of the depature processor function if provided with a string instead of an apartment"""
    test = departure_processor(tenant=l, apartment="test", rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: incorrect apartment argument"

def test_departure_processor_bad_rents_failure() -> None:
    """Checks the failure of the depature processor function if provided with a string instead of a rents Dataframe"""
    test = departure_processor(tenant=l, apartment=a, rents="test")
    assert test == "Error: incorrect rents argument"

#Test that the input checks suite is properly called and works as intended
def test_input_checks_suite() -> None:
    """Checks that the input test suite runs properly when the departure processor function is called and that is throws an error if applicable"""
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
        current_tenant_id="Test_id_2", 
    )
    test = departure_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: The tenant is not assigned to the provided apartment"