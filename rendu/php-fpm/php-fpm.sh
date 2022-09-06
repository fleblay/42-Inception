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
	wp core download --path=/var/www/html --allow-root
	#Maria-db container needs to be running
	wp config create --path=/var/www/html --dbname=$MYSQL_WP_DB_NAME --dbuser=$MYSQL_WP_ADMIN_USERNAME --dbpass=$MYSQL_WP_ADMIN_PASS --dbhost=maria-db --allow-root
	wp core install --path=/var/www/html --url=localhost --title=Inception --admin_user=$WP_WP_ADMIN_USERNAME --admin_password=$WP_WP_ADMIN_PASS --admin_email='fle-blay@student.42.fr' --allow-root
	echo -e "${YELLOW}WP init done${RESET}"
	echo -e "${YELLOW}Adding redis config${RESET}"
	wp config set WP_CACHE true --path=/var/www/html --allow-root
	wp config set WP_REDIS_HOST redis --path=/var/www/html --allow-root
	wp config set WP_REDIS_PORT 6379 --path=/var/www/html --allow-root
	wp config set WP_REDIS_TIMEOUT 1 --path=/var/www/html --allow-root
	wp config set WP_REDIS_READ_TIMEOUT 1 --path=/var/www/html --allow-root
	wp config set WP_REDIS_DATABASE 0 --path=/var/www/html --allow-root
	wp config set WP_REDIS_SCHEME tcp --path=/var/www/html --allow-root
	wp plugin install redis-cache --path=/var/www/html --allow-root
	wp plugin activate redis-cache --path=/var/www/html --allow-root
	wp redis enable --path=/var/www/html --allow-root
else
	echo -e "${GREEN}WP already OK${RESET}"
fi

echo -e "${YELLOW}Launching php-fpm${RESET}"
exec "$@"
