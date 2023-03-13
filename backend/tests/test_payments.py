from datetime import datetime
import pandas as pd

from backend.application.utilities.id_generator import id_gen

from backend.application.models.enums.enums import Inventory_type

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.inventory import Inventory
from backend.application.models.bill import Rent_bill

from backend.application.main_logic.rent_bill_creator import rent_bill_creator
from backend.application.main_logic.payment_processor import payment_processor

a = Apartment(
        id=id_gen(),
        address_1="12 rue du marais",
        address_2="",
        zipcode="67000",
        city="Strasbourg",
        monthly_charges=50,
        monthly_rent=600,
        deposit=650,
        in_management=True
    )

l = Tenant(
        id=id_gen(),
        firstname="Antoine",
        lastname="Dupont",
        email="gui.favrot@gmail.com",
        caf_payment=False
    )

e = Inventory(
        id=id_gen(),
        apartment_id=a.id,
        tenant_id=l.id,
        type=Inventory_type.EXIT,
        date = datetime.now(),
        remarks="Remarques:\n- Egratignure baignoire\n- Marques sur le parquet"
    )

bill = Rent_bill(
        id=id_gen(),
        tenant_id=l.id,
        apartment_id=a.id,
        rent_amount=a.monthly_rent,
        charges=a.monthly_charges,
        management_fees=a.management_fees,
        paid=False,
        period="january_2023"
    )

bill = bill.__dict__

#Tests the creation of a bill

def test_rent_bill_creator_successful_creation():
    """Checks that the rent_bill creator function runs properly if provided with the appropriate arguments"""
    b = rent_bill_creator(tenant=l, apartment=a, period="february_2023", former_rents=pd.DataFrame(bill, index=[0,]))
    assert type(b) == Rent_bill

def test_rent_bill_creator_unsuccessful_creation():
    """Checks that the rent_bill creator function fails if provided with a period for which a bill has already been issued"""
    b = rent_bill_creator(tenant=l, apartment=a, period="january_2023", former_rents=pd.DataFrame(bill, index=[0,]))
    assert type(b) != Rent_bill

#Test the payment processus behavior class

def test_bill_payment_direct():
    """Checks that the payment processor properly apply the direct payment method if the tenant is set to caf_payment=False"""
    b = rent_bill_creator(tenant=l, apartment=a, period="february_2023", former_rents=pd.DataFrame(bill, index=[0,]))
    payment_processor(tenant=l, bill=b, paid_amount=698)
    assert b.paid == True

def test_bill_payment_caf():
    """Checks that the payment processor properly apply the caf payment method if the tenant is set to caf_payment=True"""
    b = rent_bill_creator(tenant=l, apartment=a, period="february_2023", former_rents=pd.DataFrame(bill, index=[0,]))
    l.caf_payment = True
    l.apl_amount = 300
    payment_processor(tenant=l, bill=b, paid_amount=398)
    assert b.paid == True

