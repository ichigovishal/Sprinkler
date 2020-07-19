FROM python:3

RUN apt-get update

COPY . /var/sprinklerserver

RUN python -m  pip install -r /var/sprinklerserver/requirements.txt

