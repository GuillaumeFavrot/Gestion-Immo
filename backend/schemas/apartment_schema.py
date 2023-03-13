from marshmallow import Schema, fields

# Message Schema

class Apartment_schema(Schema):
    address_1 = fields.Str()
    address_2 = fields.Str()
    zipcode = fields.Str()
    city = fields.Str()
    monthly_charges = fields.Float()
    monthly_rent = fields.Float()
    deposit = fields.Float()
    in_management = fields.Bool()
    management_fees = fields.Float()
    id = fields.Str()
    current_tenant_id = fields.Str()
    current_tenant_entry_date = fields.Str()

# Schema initialization

apartment_schema = Apartment_schema()
apartments_schema = Apartment_schema(many = True) 