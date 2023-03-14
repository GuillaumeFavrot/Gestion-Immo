from backend.exts import db
from datetime import date, datetime, timedelta

from backend.application.models.tenant import Tenant
from backend.application.models.enums.enums import Deposit_status

from backend.application.main_logic.payment import Payment

class Bill():
    """Bill base class"""
    __tablename__ = "Bill"
    id = db.Column(db.String(255), primary_key=True)
    apartment_id = db.Column(db.String(255), unique=False)
    tenant_id = db.Column(db.String(255), unique=False)
    total_amount = db.Column(db.Float, unique=False)
    paid_amount = db.Column(db.Float, unique=False)
    paid = db.Column(db.Boolean, unique=False)
    issue_date = db.Column(db.Date, unique=False)
    due_date = db.Column(db.Date, unique=False)
    
    def __init__(
            self, 
            id: str,  
            apartment_id: str,
            tenant_id: str,
            total_amount: float = 0,
            paid_amount: float = 0,
            paid: bool = False,
            issue_date: date = datetime.now(),
            due_date: date = datetime.now() + timedelta(weeks=4)
        ):
        self.apartment_id = apartment_id
        self.tenant_id = tenant_id
        self.total_amount = total_amount
        self.paid_amount = paid_amount
        self.paid = paid
        self.issue_date = issue_date
        self.due_date = due_date
        self.id = id

    def pay(self, payment: Payment, tenant: Tenant, paid_amount: float) -> None:
        self.paid_amount += payment.get_paid_amount(tenant, paid_amount)
        if self.paid_amount == self.total_amount:
            self.paid = True

class Deposit_bill(Bill, db.Model):
    """
    Deposit bill data structure
    
    By default the deposit status is set to active (is attached to a running contract), paid is set to False and refunded is set to false 
    
    Required data : id, tenant_id, apartment_id, deposit_amount.
    """
    __tablename__ = "Deposit_bill"
    deposit_amount = db.Column(db.Float, unique=False)
    status = db.Column(db.String(255), unique=False)
    refunded = db.Column(db.Boolean, unique=False)
    
    def __init__(
            self,
            id: str,  
            apartment_id: str,
            tenant_id: str,
            deposit_amount: float = 0,
            paid: bool = False,
            status: Deposit_status = Deposit_status.ACTIVE.value,
            refunded: bool = False
        ):
        super().__init__(          
            id = id,  
            apartment_id = apartment_id,
            tenant_id = tenant_id,
            total_amount = 0,
            paid_amount = 0,
            paid = paid,
            issue_date = datetime.now(),
            due_date = datetime.now() + timedelta(weeks=4))
        self.deposit_amount = deposit_amount
        self.total_amount = self.deposit_amount
        self.status = status
        self.refunded = refunded
        

class Rent_bill(Bill, db.Model):
    """
    Rent bill data structure

    By default management fees are set to 0 and paid is set to False
    The due date is set to one month after the issue date

    Required data : id, tenant_id, apartment_id, rent_amount, charges, management_fees, period.
    """
    __tablename__ = "Rent_bill"
    rent_amount = db.Column(db.Float, unique=False)
    charges = db.Column(db.Float, unique=False)
    management_fees = db.Column(db.Float, unique=False)
    period = db.Column(db.String(255), unique=False)

    def __init__(
            self,
            id: str,  
            apartment_id: str,
            tenant_id: str,
            paid: bool = False,
            rent_amount: float = 0,
            charges : float = 0,
            management_fees: float = 0,
            period: str = "",
        ):
        super().__init__(          
            id = id,  
            apartment_id = apartment_id,
            tenant_id = tenant_id,
            total_amount = 0,
            paid_amount = 0,
            paid = paid,
            issue_date = datetime.now(),
            due_date = datetime.now() + timedelta(weeks=4))
        self.rent_amount = rent_amount
        self.charges = charges
        self.management_fees = management_fees
        self.total_amount = self.rent_amount + self.charges + self.management_fees
        self.period = period
