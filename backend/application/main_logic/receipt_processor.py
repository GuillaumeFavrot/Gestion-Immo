from pandas import DataFrame

from backend.application.utilities.email_manager import Email_manager
from backend.application.utilities.pdf_processor import Pdf_processor

from backend.application.models.apartment import Apartment
from backend.application.models.tenant import Tenant

from backend.application.utilities.editor_input_checker import editor_input_checks_suite


months = {
    "january": "1er au 31 janvier",
    "february": "1er au 28 fevrier",
    "march": "1er au 31 mars",
    "april": "1er au 30 avril",
    "may": "1er au 31 mai",
    "june": "1er au 30 juin",
    "july": "1er au 31 juillet",
    "august": "1er au 31 aout",
    "september": "1er au 30 septembre",
    "october": "1er au 31 octobre",
    "november": "1er au 30 novembre",
    "december": "1er au 31 decembre"
}

def receipt_processor(tenant: Tenant, apartment: Apartment, rents: DataFrame, requested_period: list, pdf:bool) -> str:
    """Handles the creation and sending process of requested receipts"""

    #Input type validation
    if type(tenant) == Tenant:
        if type(apartment) == Apartment:
            if type(rents) == DataFrame:
                if type(requested_period) == list:
                    pass
                else:
                    return "Error: incorrect requested_period argument"
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
    
    #Requested period validity check (does a bill exists for each month of the required period?)
    if Receipt_editor.check_period_validity(period=requested_period, rents=rents):
        pass
    else:
        return "Error: The requested period in invalid"
    
    #Rents payment check (have all bills from the required period been paid?)
    if Receipt_editor.check_rents_payment(period=requested_period, rents=rents):
            pass
    else:
        return "Error: All bills of the required period have not been paid"
    
    #If all checks have been successfuly passed the receipt is created
    Receipt_editor.create_receipt(tenant=tenant, apartment=apartment, rents=rents, requested_period=requested_period)
    
    #Creation of the email
    email = Email_manager.create_email(
        receiver_email=tenant.email,
        email_subject="Vos quittances de loyer",
        email_body="Bonjour,\n\nVeuillez trouver ci-jointes vos quittances de loyer.\n\nCordialement",
        email_attachments=True
    )
    
    #Sending of the email 
    Email_manager.send_email(message=email)
    
    #Deletion of all leftover files in the documents output folder
    Email_manager.clear_documents_output_folder()

    #Informs the program the the operation full success
    return "Required receipts successfuly created and sent"

input_folder = "/backend/application/documents_template"

class Receipt_editor():

    def check_period_validity(period: list, rents: DataFrame) -> bool:
        """Checks whether a rent bill exists for each month on the requested period"""
        for month in period:
            if rents.where(rents.period == month).dropna(axis=0,subset=["tenant_id"]).shape[0] != 0:
                pass
            else: return False
        return True
    

    def check_rents_payment(period: list, rents: DataFrame) -> bool:
        """Checks whether each bill of the requested period have been paid"""
        for month in period:
            if rents.where(rents.period == month).dropna(axis=0,subset=["tenant_id"]).paid.values[0] == True:
                pass
            else: return False
        return True
    

    def create_receipt(tenant: Tenant, apartment: Apartment, rents: DataFrame, requested_period: list) -> str:
        """Retrieves the raw text from the pdf template and return the edited text"""
        
        for period_slice in requested_period:

            #Creation of some variables needed for by the receipt template 
            month = period_slice.split("_")[0]
            year = period_slice.split("_")[1]
            mois = months[month].split(" ")[-1]

            #Selection of the appropriate template
            text = Pdf_processor.pdf_reader(path=f".{input_folder}/rent_receipt_template.pdf")

            #Definition of fields to edit in the template text
            fields = {
                "**period" : months[period_slice.split("_")[0]], 
                "**total_rent_paid" : str(rents.where(rents.period == period_slice).paid_amount.values[0]), 
                "**address_2" : apartment.address_2, 
                "**month2" : mois, 
                "**firstname" : tenant.firstname, 
                "**year" : year, 
                "**monthly_rent" : str(apartment.monthly_rent), 
                "**address_1" : apartment.address_1, 
                "**lastname" : tenant.lastname, 
                "**zipcode" : apartment.zipcode, 
                "**management_fees_string" : f"Frais de gestion: {apartment.management_fees} euros" if apartment.in_management == True else "", 
                "**city" : apartment.city, 
                "**charges" : str(apartment.monthly_charges)
            }

            text = Pdf_processor.pdf_editor(text=text, fields=fields)

            Pdf_processor.pdf_creator(text=text, document_name=f"{tenant.lastname}_{tenant.firstname}_quittance_de_loyer_{period_slice}")



