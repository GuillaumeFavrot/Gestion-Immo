#!/bin/python
import os

# Defines the base directory of the backend folder
basedir = os.path.abspath(os.path.dirname(__file__))

# Defines the relative location of the frontend build folder
static_folder_path = './../frontend/build'

# Object bundling DB configuration variables
class Config_prod(object):
    """DB config class"""
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    
class Config_dev(object):
    """DB config class"""
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False