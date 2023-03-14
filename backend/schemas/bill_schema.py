from marshmallow import Schema, fields

# Message Schema

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
    
# Schema initialization

deposit_bill_schema = Deposit_bill_schema()
deposit_bills_schema = Deposit_bill_schema(many = True) 