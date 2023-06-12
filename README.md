# 42-Inception

Infrastructure deployment with Docker

Final Grade : [![fle-blay's 42 Inception Score](https://badge42.vercel.app/api/v2/clin3d2hs006008muostgzpop/project/2710761)](https://github.com/JaeSeoKim/badge42)

## Overview

The goal of this projet is to create an infrastructure of different services running in containers, inside a virtual machine. This infrasctrure allows to access a fully functionnal WordPress website using a regular browser

The following services will be running :

<ul>
  <li>NGINX with TLS</li>
  <li>WordPress + php-fpm</li>
  <li>MariaDB</li>
  <li>BONUS : Redis Cache</li>
  <li>BONUS : FTP Server</li>
  <li>BONUS : Personal Static WebSite</li>
  <li>BONUS : Adminer</li>
  <li>BONUS : Any service with usefull</li>
</ul>

## Constraints

<ul>
  <li>
    Each DockerFile has to be created from scratch : no using DockerFiles from dockerhub
  </li>
  <li>
    The whole project has to start using Make. This means the project structure must rely on :
    <ul>
      <li>A Makefile on top of...</li>
      <li>A docker-compose file using various...</li>
      <li>DockerFiles</li>
    </ul>
  </li>
  <li>
    Abiding by DockerFile best practices is mandatory : PID1, no sleep infinity in scripts, justify exposing ports...  
  </li>
</ul>

## Implemented Solution

The docker-compose file will start the following containers :

<ul>
  <li>
    NGINX : Main ingress point of the infrastructure. Listen https requests on port 443 and proxy passes them to the ad-hoc services. The main goal is to treat requests on .php files for the wordpress website, and send back php-fpm response to the client
  </li>
   <li>
    PHP-FPM : Processes .php files and send back the result. The main goal is to listen for GET/POST requests on the Wordpress .php files, process them and send the result back to NGINX. 
  </li>
     <li>
    MariaDB : Database server in charge of storing and retrieving data for the Website (users's posts, images...) 
  </li>
  <li>
    Redis Cache : Cache for requests on the website pages. Its role is to speed up the reponse time. Because DB queries and php rendering can be quite long, Redis will store in RAM (and optionnaly on disk) the results of the client requests. If 2 similar requests happen in a short time range, the first one will be treated normally (php + MariaDB), but the second one will be served by Redis, with a copy of the result of the first request.
  </li>
  <li>
    VSFTP : FTP server for updating the Worpress Website files. It provides a simple way (with a ftp client) to modify and update the website content without the need to have acces to the Virtual Machine filesystem.
  </li>
  <li>
    Monitoring system : Node_exporter / Prometheus / Grafana. It provides a monitoring interface with metrics (CPU usage, RAM usage, HDD access) of the Virtual Machine running the containers. It is built on top of 3 containers :
    <ul>
      <li>
        Node_exporter : Periodically collects info on ressources usage of the VM and sends them to Prometheus.
      </li>
      <li>
        Prometheus : Gathers info from node_exporter and stores them in a Database. Gives access to current VM info and history to clients, such as Grafana
      </li>
      <li>
        Grafana : Webinterface for reading the VM metrics. It is mainly a dashboard displaying the infos from Prometheus in a user friendly manner. It is accessible through port 3000
      </li>
    </ul>
  </li>
  <li>
    NodeJS : FTP server built with ExpressJS framework on the NodeJS environment. Serves the Personal Website files (completely different from the WordPress one)
  </li>
</ul>

### Schematics and Diagrams

<p align="center">
  <img src="./doc/Inception.svg" width="100%">
</p>

## Usage

### Dependencies

First and foremost, make sure you have the following packages installed on your machine :

<ul>
  <li>Docker</li>
  <li>Make</li>
</ul>

### Install

Clone the repo on your machine and go to project directory :

```console
  git clone https://github.com/fleblay/42-Inception && cd !#:2:t
```

Lauch the docker infra using the Makefile provided :

```console
  make
```
Access the Website on <a href="https://localhost:443">localhost</a>
Note : You might have to tweak your browser to access it because the SSL certificate is self-signed.

## ROX (Return On Experience)

### Knowledge acquired during this project

<ul>
  <li>
    Docker :
    <ul>
      <li>
		Running containers using prebuilt images from the hub
      </li>
      <li>
		Creating custom images with DockerFiles following Docker best practices (PID 1, using the build cache correctly, CMD versus ENTRYPOINT commands...
      </li>
      <li>
		Setting up volumes and networks between the HOST and the containers to allow them to communicate and read/write data to the filesystem
      </li>
      <li>
		Deploying a complete infrastructure with the Docker Compose and the yaml files
      </li>
      <li>
		Improving knowledge on NGINX configuration files
      </li>
    </ul>
  </li>
  <li>
	Learning the basics of SQL and how to send queries using the CLI client
  </li>
  <li>
	Learning how to setup a working website from scratch :
    <ul>
      <li>
			Generating a SSL certificate
</li>
		<li>
			Setting up the route to proxy_pass requests to the CGI/FastCGI
		</li>
		<li>
			Creating a Database with access and running a DB Client (mysqld)
        </li>
	</ul>
  </li>
  <li>
    Adding a monitoring system to a docker stack with node_exporter, Prometheus and Grafana
  </li>
  <li>
  	Learning the basis of Javascript for frontend and backend (nodeJS/Express) web development
  </li>
</ul>

### Challenges faced

<ul>
	<li>
		Working with the differences between the MACOS and Linux version of Docker
	</li>
	<li>
		Recreating my own version of the official images of NGINX, MariaDB, PHP-FPM was time consuming (but greatly increased my ease with DockerFiles along with my knowledge of how thoses services work). Same goes for the Monitoring stack (Grafana/Prometheus/node_exporter)
	</li>
	</ul>
