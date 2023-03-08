import os

import pandas as pd

from email.mime.multipart import MIMEMultipart

from models.tenant import Tenant
from models.apartment import Apartment
from models.bill import Rent_bill


from utilities.email_manager import Email_manager
from utilities.id_generator import id_gen
from utilities.pdf_converter import convert_documents_to_pdf
from utilities.editor_input_checker import editor_input_checks_suite

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
        paid=True,
        period="january_2023"
    )

bill = bill.__dict__

#Tests the id generator utility
def test_id_gen_format() -> None:
    """Checks that the id_gen function returns a 12 character string"""
    assert len(id_gen()) == 12

def test_id_gen_reliability() -> None:
    """Checks that the id_gen function return unique values"""
    error_count = 0
    ids = []
    while len(ids) < 10000 :
        new_id = id_gen()
        if new_id in ids :
            error_count += 1
        ids.append(new_id)
    assert error_count == 0

#Tests the pdf converter utility
def test_pdf_converter() -> None:
    """Checks that the pdf_converter function properly convert all .docx files in the documents_output folder to pdf"""
    f = open("./documents_output/test.docx", "x")
    f.close()
    convert_documents_to_pdf()
    assert str(os.listdir("./documents_output")[0]).endswith("pdf")

#Tests the email manager
email = Email_manager.create_email("dev.mail.python.68@gmail.com", "Test", "Test", email_attachments=True)

def test_email_manager_create_email() -> None:
    """Checks that the email manager creator method properly create a MIMEMultipart object"""
    assert type(email) == MIMEMultipart

def test_email_manager_type_detection() -> None:
    """Checks that the email manager sender method do not accept anything but a MIMEMultipart object """
    a = 1
    assert Email_manager.send_email(a) == False

def test_email_manager_successful_sending() -> None:
    """Checks that the the email manager sender method runs properly"""
    assert Email_manager.send_email(email) != False

def test_clear_documents_output_folder() -> None:
    """Checks that the the email manager clear method properly cleans the documents_output folder"""
    Email_manager.clear_documents_output_folder()
    assert len(os.listdir("./documents_output")) == 0

#Test the input checker
def test_input_checker_success() -> None:
    """Checks that the editor_input_checker suite do not raise any error if provided with appropriate arguments"""
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "All clear"

def test_input_checker_failure_wrong_apartment() -> None:
    """Checks that the editor_input_checker suite return an error string if the bill do not apply to the provided apartment"""
    bill["apartment_id"] = "test_id_2"
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: Provided rents do not apply to the correct Apartment"

def test_input_checker_failure_wrong_tenant() -> None:
    """Checks that the editor_input_checker suite return an error string if the bill do not apply to the provided tenant"""
    bill["tenant_id"] = "test_id_2"
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: Provided rents do not apply to the correct tenant"

def test_input_checker_failure_multiple_tenants_or_apartments_bills() -> None:
    """Checks that the editor_input_checker suite return an error string if the rent dataframe contains bill from multiple tenant/apartment pairs"""
    rents = pd.DataFrame(bill, index=[0,])
    new_bill = Rent_bill(
        id=id_gen(),
        tenant_id="Test_id_3",
        apartment_id="Test_id_3",
        rent_amount=a.monthly_rent,
        charges=a.monthly_charges,
        management_fees=a.management_fees,
        paid=True,
        period="february_2023"
    )
    new_bill = new_bill.__dict__
    rents.loc[1] = new_bill
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=rents)
    assert test == "Error: An error occured during the extraction process"

def test_input_checker_failure_no_bills_provided() -> None:
    """Checks that the editor_input_checker suite return an error string if the rent dataframe contains no bills"""
    rents = pd.DataFrame()
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=rents)
    assert test == "Error: No bills have been provided"

def test_input_checker_failure_tenant_not_assigned_to_apartment() -> None:
    """Checks that the editor_input_checker suite return an error string if the tenant is not assigned the the provided apartment"""
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
        current_tenant_id="Test_id_4"
    )
    test = editor_input_checks_suite(tenant=l, apartment=a, rents=pd.DataFrame(bill, index=[0,]))
    assert test == "Error: The tenant is not assigned to the provided apartment"