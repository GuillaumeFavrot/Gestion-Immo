
from backend.application.main_logic.payment import Direct_payment, CAF_Combined_Payment

from backend.application.models.tenant import Tenant
from backend.application.models.bill import Bill

def payment_processor(tenant: Tenant, bill: Bill, paid_amount) -> None:
    """Handles the selection of the right payment method for the tenant using the payment method factory and proceeds with the payment"""
    if len(bill.__dict__) == 12 or tenant.caf_payment == False:
        bill.pay(Direct_payment(), tenant=tenant, paid_amount=paid_amount) 
    else : bill.pay(CAF_Combined_Payment(), tenant=tenant, paid_amount=paid_amount)