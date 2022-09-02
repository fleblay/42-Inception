FROM debian:buster

ENV WP_ADMIN_USERNAME	$WP_ADMIN_USERNAME
ENV WP_ADMIN_PASS		$WP_ADMIN_PASS
ENV WP_USER_USERNAME	$WP_USER_USERNAME
ENV WP_USER_PASS		$WP_USER_PASS

RUN apt-get update -y && apt-get install -y mariadb-client mariadb-server
#RUN apt-get update -y && apt-get install -y mariadb-client mariadb-server procps vim

COPY ./maria-db.sh /
RUN chmod a+x /maria-db.sh

VOLUME wp_db
EXPOSE 3306

ENTRYPOINT ["/maria-db.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
