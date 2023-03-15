from marshmallow import Schema, fields


class Inventory_schema(Schema):
    id = fields.Str()
    apartment_id = fields.Str()
    tenant_id = fields.Str()
    date = fields.Date()
    type = fields.Str()
    remarks = fields.Str()


# Schema initialization

inventory_schema = Inventory_schema()
inventories_schema = Inventory_schema(many = True)