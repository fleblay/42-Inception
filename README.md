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
    The whole project has to start using ```sh Make``` . This means the project structure must rely on :
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

### Schematics and Diagrams
<p align="center">
  <img src="./doc/Inception.svg" width="100%">
</p>
## Usage

### Dependencies

### Install

## ROX (Return On Experience)

### Knowledge acquired during this project

### Challenges faced
