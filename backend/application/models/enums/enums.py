from enum import Enum

class Deposit_status(Enum):
    ACTIVE = "active"
    NON_ACTIVE = "non_active"
    
class Inventory_type(Enum):
    ENTRY = "entry"
    EXIT = "exit"

class Apartment_fiancial_data(Enum):
    CHARGES = "monthly_charges"
    RENT = "monthly_rent"
    DEPOSIT = "deposit"

class Tenant_data_type(Enum):
    FIRSTNAME = "firstname"
    LASTNAME = "lastname"
    EMAIL = "email"
    CAF_PAYMENT = "caf_payment"
    APL_AMOUNT= "apl_amount"

class Period(Enum):
    JANUARY = "january",
    FEBRUARY = "february",
    MARCH = "march",
    APRIL = "april",
    MAY = "may",
    JUNE = "june",
    JULY = "july",
    AUGUST = "august",
    SEPTEMBER = "september",
    NOVEMBER = "november",
    DECEMBER = "december"
