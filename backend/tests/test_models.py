from datetime import datetime

from backend.application.utilities.id_generator import id_gen

from backend.application.models.enums.enums import Inventory_type
from backend.application.models.enums.enums import Apartment_fiancial_data
from backend.application.models.enums.enums import Tenant_data_type

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment
from backend.application.models.inventory import Inventory
from backend.application.models.bill import Rent_bill
from backend.application.models.bill import Deposit_bill

a = Apartment(
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
        firstname="Antoine",
        lastname="Dupont",
        email="gui.favrot@gmail.com",
        caf_payment=False
    )

e = Inventory(
        apartment_id=a.id,
        tenant_id=l.id,
        type=Inventory_type.EXIT,
        date = datetime.now(),
        remarks="Remarques:\n- Egratignure baignoire\n- Marques sur le parquet"
    )

r_b = Rent_bill(
        id=id_gen(),
        tenant_id=l.id,
        apartment_id=a.id,
        rent_amount=a.monthly_rent,
        charges=a.monthly_charges,
        management_fees=a.management_fees,
        paid=True,
        period="january_2023"
    )

d_b = Deposit_bill(
    id= id_gen(),
    tenant_id=l.id,
    apartment_id=a.id,
    deposit_amount=a.deposit
)

# Apartment model testing

def test_apartment_creation() -> None:
    """Tests the creation of an apartment"""
    assert type(a) == Apartment
    
def test_apartment_post_init() -> None:
    """Tests the post init method"""
    assert a.management_fees == a.monthly_rent / 100 * 8
    
def test_apartment_update_apartment_financial_data() -> None:
    """Tests the update_apartment_financial_data method"""
    a.update_apartment_financial_data(data_type=Apartment_fiancial_data.CHARGES, new_data=60)
    assert a.monthly_charges == 60

def test_apartment_assign_new_tenant() -> None:
    """Tests the assign new tenant method"""
    a.assign_new_tenant(tenant=l, entry_date=datetime.now())
    assert a.current_tenant_id == l.id

def test_apartment_remove_tenant() -> None:
    """Tests the assign new tenant method"""
    a.remove_tenant()
    assert a.current_tenant_id == ""

def test_delete_apartment() -> None:
    """Tests the delete apartment method"""
    assert a.delete_apartment() == "Apartment deleted"

#Tenant model testing

def test_tenant_creation() -> None:
    """Tests the creation of a tenant"""
    assert type(l) == Tenant
    
def test_update_tenant_data() -> None:
    """Tests the update tenant data method"""
    l.update_tenant_data(data_type=Tenant_data_type.FIRSTNAME, new_data="Oscar")
    assert l.firstname == "Oscar"
    
def test_delete_tenant() -> None:
    """Tests the delete tenant method"""
    assert l.delete_tenant() == "Tenant deleted"

#Inventory model testing

def test_inventory_creation() -> None:
    """Tests the creation of an inventory"""
    assert type(l) == Tenant
    
def test_update_inventory() -> None:
    """Tests the update inventory method"""
    e.update_inventory(new_remarks="Remarques:\n- Egratignure baignoire\n- Marques sur le parquet\n- Peinture cadre de porte écaillée")
    assert e.remarks == "Remarques:\n- Egratignure baignoire\n- Marques sur le parquet\n- Peinture cadre de porte écaillée"

def test_delete_inventory() -> None:
    """Tests the delete inventory method"""
    assert e.delete_inventory() == "Inventory deleted"

#Bill model testing

def test_rent_bill_creation() -> None:
    """Tests a rent bill creation"""
    assert type(r_b) == Rent_bill

def test_deposit_bill_creation() -> None:
    """Tests a deposit bill creation"""
    assert type(d_b) == Deposit_bill

def test__rent_bill_post_init_method() -> None:
    """Tests the rent bill post init method"""
    #I revert the changes to the apartment financial data because the bill was created before thoses changes where made.
    a.update_apartment_financial_data(data_type=Apartment_fiancial_data.CHARGES, new_data=50)
    assert r_b.total_amount == a.management_fees + a.monthly_rent + a.monthly_charges

def test__deposit_post_init_method() -> None:
    """Tests the deposit bill post init method"""
    assert d_b.total_amount == a.deposit