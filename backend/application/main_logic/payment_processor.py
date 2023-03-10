
from main_logic.payment import Direct_payment, CAF_Combined_Payment

from models.tenant import Tenant
from models.bill import Bill

def payment_processor(tenant: Tenant, bill: Bill, paid_amount) -> None:
    """Handles the selection of the right payment method for the tenant using the payment method factory and proceeds with the payment"""

    if type(bill) == "Deposit_bill" or tenant.caf_payment == False:
        bill.pay(Direct_payment(), tenant=tenant, paid_amount=paid_amount) 
    else : bill.pay(CAF_Combined_Payment(), tenant=tenant, paid_amount=paid_amount)