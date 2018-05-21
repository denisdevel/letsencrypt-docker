# Readme Gronade Website #

The Gronade Website consists of several files in PHP
For the frontend, there has been a framework used - for more information on that one consult Kiah Hickson
Other main libraries used for styling are:

- Bootstrap v.3
- JQuery

Besides that, there are a few extra functionality scripts

- the chatbot functionality lives in assets/js/vendor/chatboxcp.js

# Build with docker, ubuntu and apache

to build execute

    docker build -t groweb .

to test

	docker stop `docker ps | awk '{print $1}' | sed -n 2p`; docker build -t groweb .; docker run -dp 80:80 groweb

to run	

    docker run -dp 80:80 -dit --restart unless-stopped groweb

to access the container run

    docker exec -it <container id> bash


## TO DO

the SSL functionality is not implemented yet because it has been tested with vagrant on localhost. 
To test SSL we need to work with the domain name, preferably on an AWS instance.

Easy SSL interactions are used in CERTBOT, probably have to modify the APACHE config file for that. 

check https://hub.docker.com/r/certbot/certbot/

check https://certbot.eff.org/
