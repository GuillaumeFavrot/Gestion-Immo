from flask.cli import FlaskGroup

# This file is the command line interface point of the app.
# It has two available commands "run" and "create_db":
# $ python manage.py run : This command launches the flask web server
# $ python manage.py create_db : This command creates a new Postgres database (Warning: This will erase all previously existing database)

from backend.app import app
from backend.exts import db

import os

cli = FlaskGroup(app)

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    cli()