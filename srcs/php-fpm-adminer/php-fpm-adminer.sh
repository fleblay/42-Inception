#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

sed -i "s/^listen =.*/listen = 9001/" /etc/php/7.3/fpm/pool.d/www.conf

echo -e "${YELLOW}Launching php-fpm for adminer${RESET}"
exec "$@"
