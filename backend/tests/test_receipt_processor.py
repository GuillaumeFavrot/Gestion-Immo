import pandas as pd

from backend.application.utilities.id_generator import id_gen

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.bill import Rent_bill

from backend.application.main_logic.receipt_processor import *

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
        current_tenant_id="Test_id", 
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
        paid=True,
        period="january_2023"
    )

period = ["january_2023"]

bill = bill.__dict__

#Success test
def test_receipt_processor_success() -> None:
    """Checks the success of the receipt processor function if provided with appropriate arguments"""
    test = receipt_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Required receipts successfuly created and sent"

#Type error test
def test_departure_processor_bad_tenant_type_failure() -> None:
    """Checks the failure of the receipt processor function if provided with a string instead of a tenant"""
    test = receipt_processor(tenant="test", apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Error: incorrect tenant argument"

def test_departure_processor_bad_apartment_type_failure() -> None:
    """Checks the failure of the receipt processor function if provided with a string instead of a apartment"""
    test = receipt_processor(tenant=l, apartment="test", rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Error: incorrect apartment argument"

def test_departure_processor_bad_rents_type_failure() -> None:
    """Checks the failure of the receipt processor function if provided with a string instead of a rents Dataframe"""
    test = receipt_processor(tenant=l, apartment=a, rents="test", requested_period=period, pdf=True)
    assert test == "Error: incorrect rents argument"

def test_departure_processor_bad_period_type_failure() -> None:
    """Checks the failure of the receipt processor function if provided with a string instead of a period list"""
    test = receipt_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period="test", pdf=True)
    assert test == "Error: incorrect requested_period argument"

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
    test = receipt_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Error: The tenant is not assigned to the provided apartment"

#Requested period tests
def test_departure_processor_invalid_period_failure() -> None:
    """Checks the failure of the receipt processor function if provided with an improper period"""
    period = ["january_2023", "february_2023"]
    test = receipt_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Error: The requested period in invalid"

def test_departure_processor_rent_non_payment_failure() -> None:
    """Checks the failure of the receipt processor function if provided with unpaid bills"""
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
    test = receipt_processor(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]), requested_period=period, pdf=True)
    assert test == "Error: All bills of the required period have not been paid"