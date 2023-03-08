#!/bin/python
import random
import string

elements = string.ascii_letters+string.digits

def id_gen() -> str:
    """Generates a random twelve characters ID"""
    return ''.join(random.choices(elements, k=12))