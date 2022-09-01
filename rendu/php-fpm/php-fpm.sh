#!/bin/bash

RED=\\e[31m
GREEN=\\e[32m
YELLOW=\\e[33m
RESET=\\e[0m

sed -i "s/^listen =.*/listen = 9000/" /etc/php/7.3/fpm/pool.d/www.conf
while ! mysqladmin ping --host maria-db > /dev/null 2>&1
do
	echo -e "${RED}Php-fpm container : Waiting for mysqld server to be running${RESET}" && sleep 1
done
echo -e "${GREEN}Php-fpm container : mysqld server is up !${RESET}"

echo -e "${YELLOW}Testing if WP needs to be initialized${RESET}"
if ! test -e /var/www/html/index.php
then
	echo -e "${YELLOW}WP init${RESET}"
	cd /var/www/html/
	curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
	chmod a+x wp-cli.phar
	mv wp-cli.phar /usr/local/bin/wp
	wp core download --path=/var/www/html --allow-root
	#Maria-db container needs to be running
	wp config create --path=/var/www/html --dbname=wp_db --dbuser=wp_master --dbpass=fredo42 --dbhost=maria-db --allow-root
	wp core install --path=/var/www/html --url=localhost --title=Inception --admin_user=fred --admin_password=42 --admin_email='fle-blay@student.42.fr' --allow-root
	echo -e "${YELLOW}WP init done${RESET}"
else
	echo -e "${GREEN}WP already OK${RESET}"
fi

echo -e "${YELLOW}Launching php-fpm${RESET}"
exec "$@"
