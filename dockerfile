# get the base image
FROM python:3.10.4

# set the work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && apt-get install -y netcat

# install dependencies
RUN pip install --upgrade pip

# copies all app files into the working directory
COPY . .

# install dependencies
RUN pip3 install -r ./requirements.txt

# run entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]