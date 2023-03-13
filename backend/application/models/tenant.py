from backend.exts import db
from backend.application.models.enums.enums import Tenant_data_type

class Tenant(db.Model) :
    """Tenant data-structure"""
    id = db.Column(db.String(255), primary_key=True)
    firstname = db.Column(db.String(255), unique=False)
    lastname = db.Column(db.String(255), unique=False)
    email = db.Column(db.String(255), unique=False)
    caf_payment = db.Column(db.Boolean, unique=False)
    apl_amount = db.Column(db.Float, unique=False)
    
    def __init__(
            self,
            id: str,
            firstname: str,
            lastname: str,
            email: str,
            caf_payment: bool = False,
            apl_amount: float = 0
            ):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.caf_payment = caf_payment
        self.apl_amount = apl_amount
 
    def update_tenant_data(self, data_type: Tenant_data_type, new_data) -> None:
        """Updates a tenant's data. Needs a tenant, the data to modify and a new piece of data."""
        setattr(self, data_type.value, new_data)

