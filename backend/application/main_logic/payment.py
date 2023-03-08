from abc import ABC, abstractmethod

from models.tenant import Tenant

class Payment(ABC):
    """Abstract class of the payment method factory"""
    @abstractmethod
    def get_paid_amount() -> None:
        """Abstract method"""

class Direct_payment(Payment):

    def get_paid_amount(self, tenant: Tenant, paid_amount: float) -> None:
        return paid_amount
    
class CAF_Combined_Payment(Payment):

    def get_paid_amount(self, tenant: Tenant, paid_amount: float) -> None:
        return tenant.apl_amount + paid_amount