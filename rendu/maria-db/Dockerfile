FROM debian:buster

ENV MYSQL_WP_ADMIN_USERNAME=$MYSQL_WP_ADMIN_USERNAME \
	MYSQL_WP_ADMIN_PASS=$MYSQL_WP_ADMIN_PASS \
	MYSQL_WP_USER_USERNAME=$MYSQL_WP_USER_USERNAME \
	MYSQL_WP_USER_PASS=$MYSQL_WP_USER_PASS \
	MYSQL_WP_DB_NAME=$MYSQL_WP_DB_NAME \
	MYSQL_ROOT_PASS=$MYSQL_ROOT_PASS

RUN apt-get update -y && apt-get install -y mariadb-client mariadb-server
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y procps vim

COPY ./maria-db.sh /
RUN chmod a+x /maria-db.sh

VOLUME wp_db
EXPOSE 3306

ENTRYPOINT ["/maria-db.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
