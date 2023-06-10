FROM debian:buster

RUN apt-get update -y && apt-get install -y php-fpm php7.3-mysql mariadb-client curl
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y curl vim procps

COPY ./php-fpm-adminer.sh /
RUN chmod a+x /php-fpm-adminer.sh
RUN mkdir -p /run/php/ /var/www/adminer/
RUN curl -L https://www.adminer.org/latest.php -o /var/www/adminer/adminer.php

VOLUME adminer_files
EXPOSE 9001

ENTRYPOINT ["/php-fpm-adminer.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
