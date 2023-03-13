from dataclasses import dataclass
from abc import ABC
from datetime import date, datetime, timedelta

from backend.application.models.tenant import Tenant
from backend.application.models.enums.enums import Deposit_status

from backend.application.main_logic.payment import Payment

@dataclass
class Bill(ABC):
    """Bill abstract base class"""
    id: str
    apartment_id: str
    tenant_id: str
    total_amount: float = 0
    paid_amount: float = 0
    paid: bool = False
    issue_date: date = datetime.now()
    due_date: date = datetime.now() + timedelta(weeks=4)

    def pay(self, payment: Payment, tenant: Tenant, paid_amount: float) -> None:
        self.paid_amount += payment.get_paid_amount(tenant, paid_amount)
        if self.paid_amount == self.total_amount:
            self.paid = True

@dataclass
class Deposit_bill(Bill):
    """
    Deposit bill data structure
    
    By default the deposit status is set to active (is attached to a running contract), paid is set to False and refunded is set to false 
    
    Required data : id, tenant_id, apartment_id, deposit_amount.
    """
    deposit_amount: float = 0
    status: Deposit_status = Deposit_status.ACTIVE.value
    refunded: bool = False

    def __post_init__(self):
        self.total_amount = self.deposit_amount
        

@dataclass
class Rent_bill(Bill):
    """
    Rent bill data structure

    By default management fees are set to 0 and paid is set to False
    The due date is set to one month after the issue date

    Required data : id, tenant_id, apartment_id, rent_amount, charges, management_fees, period.
    """
    rent_amount: float = 0
    charges : float = 0
    management_fees: float = 0
    period: str = ""

    def __post_init__(self):
        self.total_amount = self.rent_amount + self.charges + self.management_fees
