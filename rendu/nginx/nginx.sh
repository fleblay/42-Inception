#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

while ! nginx -t > /dev/null 2>&1
do
	echo -e "${RED}Nginx container : Waiting for php-fpm server to be running${RESET}" && sleep 1
done
echo -e "${GREEN}Nginx container : php-fpm server is up !${RESET}"

echo -e "${YELLOW}Launching nginx${RESET}"

exec "$@"
