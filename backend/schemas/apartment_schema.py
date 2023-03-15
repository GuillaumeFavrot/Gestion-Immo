from marshmallow import Schema, fields

# Message Schema

class Apartments_schema(Schema):
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
    tenant = fields.Dict()
    deposit_bills = fields.List(fields.Dict())
    rent_bills = fields.List(fields.Dict())
    inventories = fields.List(fields.Dict())

# Schema initialization

apartment_schema = Apartment_schema()
apartments_schema = Apartments_schema(many = True) 