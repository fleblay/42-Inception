FROM debian:buster

ENV MYSQL_WP_ADMIN_USERNAME=$MYSQL_WP_ADMIN_USERNAME \
	MYSQL_WP_ADMIN_PASS=$MYSQL_WP_ADMIN_PASS \
	MYSQL_WP_DB_NAME=$MYSQL_WP_DB_NAME \
	WP_WP_ADMIN_USERNAME=$WP_WP_ADMIN_USERNAME \
	WP_WP_ADMIN_PASS=$WP_WP_ADMIN_PASS

RUN apt-get update -y && apt-get install -y php-fpm php7.3-mysql mariadb-client curl
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y curl vim procps
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
	&& chmod a+x wp-cli.phar \
	&& mv wp-cli.phar /usr/local/bin/wp

COPY ./php-fpm.sh /
RUN chmod a+x /php-fpm.sh
RUN mkdir /run/php/

VOLUME wp_files
EXPOSE 9000

ENTRYPOINT ["/php-fpm.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
