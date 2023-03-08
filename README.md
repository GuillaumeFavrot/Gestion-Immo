# FRPD - FLASK-REACT-POSTRGRES-DOCKER TEMPLATE

This template has been created as a tool to speed up the process of creation and hosting of a fullstack app.



## Stack description

Frontend - React, Redux, Bootstrap

Backend - Flask, SQLAlchemy, Gunicorn, Nginx

Database - PostgreSQL (Production DB) / SQlite (Development DB)

Other - Docker



## Requirements

=> PYTHON 3.10.4 OR LATER ;

=> NODE.JS 16.XX.X OR LATER ;

=> NPM 8.15.0 OR LATER ;

All other required packages and dependencies are installed during the setup process. 
You'll find the full list of required packages in the requirement.txt and package.json files.

## Creation of the .env file

The fist step after downloading this template is to setup at the root directory of the app the .env file

The content of this file should be as follows:

### Flask variables
FLASK_APP=backend/app.py
FLASK_DEBUG=1

### Database variables
SQL_HOST=db             #This refers the the name of the container hosting the db - should remain unchanged

SQL_PORT=5432               #The port on which you access the DB - should remain unchanged

DATABASE=postgres               #The database management system - should remain unchanged 

POSTGRES_USER=username              # Change this

POSTGRES_PASSWORD=password              #Change this

POSTGRES_DB=db_name                 #Change this         

DATABASE_URL=postgresql://username:password@db:5432/db_name             #Change this accordingly



## DEVLOPMENT ENVIRONMENT SETUP

Upon downloading this template from github follow these steps to deploy the devlopment environment.



## A. Packages installation

### A.1 - Python environment and packages setup

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management :

Open a terminal in the main app directory and run these commands to launch a virtual environment :

$ pip3 install pipenv       (if not already installed)
$ pipenv shell

Then all required python packages need to be installed. Theses packages in the requirement.txt file. To install all packages from the requirement.txt file use the command :

$ pipenv install -r ./requirements.txt                                                                                                                                   ...$

TROUBLESHOOTING : If this command fails and throws a python version error this means your python version differs from the version defined in the pipfile. To troubleshoot this error :
    => Modify the pipfile python version to match the version of your python installation (however setting this version to 3.9 or lower may break the program built with python 3.10)
    => Install the required python version 

### A.2 - NPM packages setup

All javascript dependencies are listed in the package.json file in the frontend folder.

To install all javascript dependencies, navigate to the frontend directory and run the following command :
    
$ npn install                                                                                                                                                            ...$



## B - Launching the developpement environement

### B.1 - Flask

To launch the Flask web server be sure to have the virtual environment up and running then naviguate in root directory of the app and use the command :

$ python3 manage.py run                                                                                                                                                  ...$

This command will launch the python server that will be avaiblable at the following address (local) : 127.0.0.1:5000 or localhost:5000

NOTE : Flask is configured to serve the React UI on the root address (127.0.0.1:5000/) from its staticfiles folder. However this requires to generate a build version of the react app. Without a live build the root adress (127.0.0.1:5000) leads to nothing. To generate React live build refer to the next section of this manual.

### B.2 - React

To launch the react devlopment environment simply use the following command in the frontend directory :

$ npm start                                                                                                                                                           

The React development environement has it's own webserver accessible at the address : localhost:3000

The React frontend accessible on the port 3000 can interract with the backend available on the port 5000 but this requires to enable the CORS. 
The CORS is enabled by default in the app.py file of the backend folder when a devlopment environment is launched.

As said previously, Flask is configured to serve the React app on its root address however this require a React build.
To create a React build open a terminal in the frontend folder and run the following command :

$ npm run build

This command will generate a build folder in the frontend server containing static files. Those files will now be served by the flask server on its root address


## D - Creation of the devlopment database

This template runs with 2 databases :
    => One for devlopment and testing purposes : SQlite
    => One for production purposes : PostgreSQL

The Postgres DB requires a running Postgres container on the same network as the app to work. When using the Flask and React devlopment environments those requirements are NOT met hence the second SQLite DB.

To create the Sqlite DB open a terminal in the root folder of the app and run the following command :

$ python manage.py create_db                                                                                                                                            ...$

If succesfull a db.sqlite file will be created in the backend folder.



## UPDATING DEPENDENCIES

### A. Python dependencies

If you wish to install new Python dependencies this requirement.txt file will NOT update itself automatically to update it use the following command :

$ pip freeze > requirement.txt                                                                                                                                          ...$


### B. Node dependencies

The package.json update itself automatically when new dependencies are installed.



### PRODUCTION ENVIRONEMENT SETUP

Ensure that the .env file has been duly created before attempting to launch a production environment 

## A. Creating a react live build

To create a React build open a terminal in the frontend folder and run the following commands :

$ npm install
$ npm run build                                                                                                                                                         ...$

This command will generate a build folder in the frontend server containing static files.

## B. Launching the containers

To launch the app open a terminal in the root folder of the app and run the following command :

$ docker-compose up -d --build                                                                                                                                          ...$

NOTE:  Ensure the docker deamon is active before using any docker command

TROUBLESHOOTING : If the App container doesn't properly launch because is does not find the entrypoint.sh simply recreate this file with all of its content and delete the original.
This happens because Git try to convert shell files. 


## C. Creating the production Database

To create the database open a terminal in the root folder of the app and run the following command :

$ docker-compose exec app python manage.py create_db                                                                                                                    ...$

This command will run the create_db command of the manage.py file inside the running container. 
Please note that once the DB has been created it will persist in the docker volume "postgres_data".
The "create_DB" command need to be launched only once! Using it again will re-create the DB wiping all previously saved data.

## D. Taking down all containers

To take down the app open a terminal in the root folder of the app and run the following command :

$ docker-compose down                