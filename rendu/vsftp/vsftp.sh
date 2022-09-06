#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

echo -e "${YELLOW}Launching vsftp${RESET}"
exec "$@"
