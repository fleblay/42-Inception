#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

if ! test -e /var/lib/mysql/wp_db
then
	echo -e "${YELLOW}DB init${RESET}"
	mysqld &
	while ! mysqladmin ping > /dev/null 2>&1
	do
		echo -e "${RED}Waiting for mysqld server to be running${RESET}" && sleep 0.1
	done
	echo -e "${GREEN}mysqld server is up !${RESET}"
	mysql -e "update mysql.user set password=password('42'), plugin='' where user='root'"
	mysql -e "create database wp_db"
	mysql -e "grant all privileges on *.* to 'wp_master'@'%' identified by 'fredo42'"
	mysql -e "create user 'wp_user'@'%' identified by 'user42'"
	mysql -e "grant select, update, delete on wp_db.* to 'wp_user'@'%'"
	mysql -e "flush privileges"
	kill $(cat /var/run/mysqld/mysqld.pid)
	sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mariadb.conf.d/50-server.cnf
	echo -e "${YELLOW}DB init done${RESET}"
else
	echo -e "${GREEN}DB already OK${RESET}"
fi

echo -e "${YELLOW}Launching mysqld${RESET}"
exec "$@"
