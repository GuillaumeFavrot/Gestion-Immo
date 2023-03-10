#!/bin/python
from pandas import DataFrame

from backend.application.models.tenant import Tenant
from backend.application.models.apartment import Apartment

def editor_input_checks_suite(tenant: Tenant, apartment: Apartment, rents: DataFrame) -> str:
    """Runs a few checks to ensure that receipt and balance editors receive valid arguments"""
    
    #Checks that the tenant is indeed assigned to the apartment before creating a receipt
    if Editor_input_checks.tenant_assignment_check(tenant=tenant, apartment=apartment):
        pass
    else:
        return "Error: The tenant is not assigned to the provided apartment"

    #Checks that some bills exists
    if Editor_input_checks.rent_bill_existence_check(rents=rents):
        pass
    else: 
        return "Error: No bills have been provided"

    #Checks that the rents extraction did retreive only the rents that apply to a single tenant/apartment couple
    if Editor_input_checks.rents_extraction_validity_check(rents=rents):
        pass
    else:
        return "Error: An error occured during the extraction process"
        
    #Checks that the rents apply to the provided tenant
    if Editor_input_checks.rent_tenant_validity_check(tenant=tenant, rents=rents):
        pass
    else:
        return "Error: Provided rents do not apply to the correct tenant"

    #Checks that the rents apply to the provided apartment
    if Editor_input_checks.rent_apartment_validity_check(apartment=apartment, rents=rents):
        pass
    else:
        return "Error: Provided rents do not apply to the correct Apartment"
        
    return "All clear"



class Editor_input_checks():

    def tenant_assignment_check(tenant: Tenant, apartment: Apartment) -> bool:
        """Checks that the tenant is assigned the the provided apartment"""
        if tenant.id == apartment.current_tenant_id:
            return True
        else:
            return False

    def rent_bill_existence_check(rents: DataFrame) -> bool:
        """Checks that some bills have been provided"""
        if rents.shape[0] > 0:
            return True
        else:
            return False

    def rents_extraction_validity_check(rents: DataFrame) -> bool:
        """Checks that the rent extraction process did not retreived rents from multiple tenants or apartments"""
        rents_tenant = rents["tenant_id"].unique()
        rents_apartment = rents["apartment_id"].unique()

        if len(rents_tenant) > 1 or len(rents_apartment) > 1:
            return False
        else:
            return True

    def rent_tenant_validity_check(tenant: Tenant, rents: DataFrame) -> bool: 
        """Checks that the rents provided apply the the right tenant"""
        rents_tenant = rents["tenant_id"].unique()
        if rents_tenant[0] != tenant.id:
            return False
        else:
            return True

    def rent_apartment_validity_check(apartment: Apartment, rents: DataFrame) -> bool:
        """Checks that the rents provided apply the the right apartment"""
        rents_apartment = rents["apartment_id"].unique()
        if rents_apartment[0] != apartment.id:
            return False
        else:
            return True

