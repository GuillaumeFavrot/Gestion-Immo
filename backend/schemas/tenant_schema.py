from marshmallow import Schema, fields

# Message Schema

class Tenant_schema(Schema):
    firstname = fields.Str()
    lastname = fields.Str()
    email = fields.Str()
    caf_payment =fields.Bool()
    id = fields.Str()
    apl_amount = fields.Float()

# Schema initialization

tenant_schema = Tenant_schema()
tenants_schema = Tenant_schema(many = True) 