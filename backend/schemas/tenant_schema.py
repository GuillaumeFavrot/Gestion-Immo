from marshmallow import Schema, fields

# Message Schema

class Tenants_schema(Schema):
    firstname = fields.Str()
    lastname = fields.Str()
    email = fields.Str()
    caf_payment =fields.Bool()
    id = fields.Str()
    apl_amount = fields.Float()

class Tenant_schema(Schema):
    firstname = fields.Str()
    lastname = fields.Str()
    email = fields.Str()
    caf_payment =fields.Bool()
    id = fields.Str()
    apl_amount = fields.Float()
    apartments = fields.List(fields.Dict())
    deposit_bills = fields.List(fields.Dict())
    rent_bills = fields.List(fields.Dict())

# Schema initialization

tenant_schema = Tenant_schema()
tenants_schema = Tenants_schema(many = True) 