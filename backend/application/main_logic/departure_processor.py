from pandas import DataFrame

from backend.application.utilities.email_manager import Email_manager
from backend.application.utilities.pdf_processor import Pdf_processor

from backend.application.models.apartment import Apartment
from backend.application.models.tenant import Tenant
from backend.application.models.bill import Deposit_bill

from backend.application.utilities.editor_input_checker import editor_input_checks_suite

from datetime import datetime


def departure_processor(tenant: Tenant, apartment: Apartment, rents: DataFrame, deposit_bill: Deposit_bill, pdf:bool) -> str:
    """Handles the depature process of a tenant from an apartment"""

    #Input validation
    if type(tenant) == Tenant:
        if type(apartment) == Apartment:
            if type(rents) == DataFrame:
                if type(deposit_bill) == Deposit_bill:
                    pass
                else:
                    return "Error: incorrect deposit_bill argument"
            else:
                return "Error: incorrect rents argument"
        else:
            return "Error: incorrect apartment argument"
    else:
        return "Error: incorrect tenant argument"
    
    #Checks that all provided inputs are correct
    checks = editor_input_checks_suite(tenant=tenant, apartment=apartment, rents=rents)
    if checks == "All clear":
        pass
    else:
        return checks

    #Deletion the tenant from the apartment data
    apartment.remove_tenant()

    #Depostif bill deactivation
    deposit_bill.deactivate()

    #Creation of the depature balance document
    Balance_editor.create_departure_balance(tenant=tenant, apartment=apartment, rents=rents)

    #Creation of the email
    email = Email_manager.create_email(
        receiver_email=tenant.email,
        email_subject="Balance du compte locataire",
        email_body="Bonjour,\n\nVeuillez trouver ci-joints votre balance des comptes locataire.\n\nCordialement",
        email_attachments=True
    )

    #Sending of the email 
    Email_manager.send_email(message=email)

    #Deletion of all leftover files in the documents output folder
    Email_manager.clear_documents_output_folder()

    #Informs the program the the operation full success
    return "Departure successfuly processed"

input_folder = "/backend/application/documents_template"

class Balance_editor():

    def create_departure_balance(tenant: Tenant, apartment: Apartment, rents: DataFrame) -> None:
        """Create a tenant departure balance in .docx format"""
        
        #Selection of the appropriate template
        text = Pdf_processor.pdf_reader(path=f".{input_folder}/departure_balance_template.pdf")
        
        #Definition of the departure balance result 
        result = "L'ensemble de vos créances ont été règlées"
        if rents.rent_amount.sum() > rents.paid_amount.sum():
            result = f"Vous devez encore régler la somme de {rents.rent_amount.sum() - rents.paid_amount.sum()} euros."
        
        #Definition of fields to edit in the template text
        fields = {
                "**entry_date" : f"{apartment.current_tenant_entry_date.day}/{apartment.current_tenant_entry_date.month}/{apartment.current_tenant_entry_date.year}",
                "**exit_date" : f"{datetime.now().day}/{datetime.now().month}/{datetime.now().year}",
                "**total_rent_paid" : str(rents.total_amount.sum()),
                "**total_paid" : str(rents.paid_amount.sum()),
                "**address_2" : apartment.address_2, 
                "**firstname" : tenant.firstname, 
                "**monthly_rent" : str(rents.rent_amount.sum()), 
                "**address_1" : apartment.address_1, 
                "**lastname" : tenant.lastname, 
                "**zipcode" : apartment.zipcode, 
                "**management_fees_string" : f"Total frais de gestion: {rents.management_fees.sum()} euros" if apartment.in_management == True else "", 
                "**city" : apartment.city, 
                "**charges" : str(rents.charges.sum()),
                "**result" : result
        }
            
        text = Pdf_processor.pdf_editor(text=text, fields=fields)

        Pdf_processor.pdf_creator(text=text, document_name=f"{tenant.lastname}_{tenant.firstname}_Balance_des_comptes")

