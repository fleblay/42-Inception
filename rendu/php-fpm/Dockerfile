FROM debian:buster

RUN apt-get update -y && apt-get install -y php-fpm php7.3-mysql mariadb-client curl
#RUN apt-get update -y && apt-get install -y php-fpm php7.3-mysql mariadb-client curl vim procps

COPY ./php-fpm.sh /
RUN chmod a+x /php-fpm.sh
RUN mkdir /run/php/

VOLUME wp_files
EXPOSE 9000

ENTRYPOINT ["/php-fpm.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
