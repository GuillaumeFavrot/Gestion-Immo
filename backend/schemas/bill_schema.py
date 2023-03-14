from marshmallow import Schema, fields

class Deposit_bill_schema(Schema):
    id = fields.Str()
    apartment_id = fields.Str()
    tenant_id = fields.Str()
    total_amount = fields.Float()
    paid_amount = fields.Float()
    paid = fields.Bool()
    issue_date = fields.Date()
    due_date = fields.Date()
    deposit_amount = fields.Float()
    status = fields.Str()
    refunded = fields.Bool()

class Rent_bill_schema(Schema):
    id = fields.Str()
    apartment_id = fields.Str()
    tenant_id = fields.Str()
    total_amount = fields.Float()
    paid_amount = fields.Float()
    paid = fields.Bool()
    issue_date = fields.Date()
    due_date = fields.Date()
    rent_amount = fields.Float(),
    charges = fields.Float(),
    management_fees = fields.Float(),
    period = fields.Str()
    
# Schema initialization

deposit_bill_schema = Deposit_bill_schema()
deposit_bills_schema = Deposit_bill_schema(many = True)

rent_bill_schema = Rent_bill_schema()
rent_bills_schema = Rent_bill_schema(many = True)