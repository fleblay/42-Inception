#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mariadb.conf.d/50-server.cnf
mysqld_safe --log-error=/var/lib/mysql/.error.log --skip-syslog &
while ! mysqladmin ping > /dev/null 2>&1
do
	echo -e "${RED}Maria container : Waiting for mysqld server to be running${RESET}" && sleep 1
done
echo -e "${GREEN}Maria container : mysqld server is up !${RESET}"

#FOR DEBUGGING PURPOSES
#echo -e "${YELLOW}---------------ERROR LOG BEGIN-----------------${RESET}"
#cat /var/lib/mysql/.error.log | grep -e "Warning" -e "Error"
#cat /var/lib/mysql/.error.log
#echo -e "${YELLOW}---------------ERROR LOG END-------------------${RESET}"

echo -e "${YELLOW}Testing if DB needs to be initialized${RESET}"
if ! test -e /var/lib/mysql/wp_db
then
	echo -e "${YELLOW}DB init${RESET}"
	echo -e "${GREEN}mysqld server is up !${RESET}"
	mysql -e "update mysql.user set password=password('$MYSQL_ROOT_PASS'), plugin='' where user='root'"
	mysql -e "create database $MYSQL_WP_DB_NAME"
	mysql -e "grant all privileges on *.* to '$MYSQL_WP_ADMIN_USERNAME'@'%' identified by '$MYSQL_WP_ADMIN_PASS'"
	mysql -e "create user '$MYSQL_WP_USER_USERNAME'@'%' identified by '$MYSQL_WP_ADMIN_PASS'"
	mysql -e "grant select, update, delete on $MYSQL_WP_DB_NAME.* to '$MYSQL_WP_USER_USERNAME'@'%'"
	mysql -e "flush privileges"
	echo -e "${YELLOW}DB init done${RESET}"
else
	echo -e "${GREEN}DB already OK${RESET}"
fi

kill $(cat /var/run/mysqld/mysqld.pid)
echo -e "${YELLOW}Launching mysqld${RESET}"
exec "$@"
