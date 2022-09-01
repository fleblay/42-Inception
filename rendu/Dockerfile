FROM debian:buster

RUN apt-get update -y && apt-get install -y mariadb-client mariadb-server procps vim
COPY ./maria-db.sh /
RUN chmod a+x /maria-db.sh

VOLUME wp_db
EXPOSE 3306

ENTRYPOINT ["/maria-db.sh"]
CMD ["echo this should be overloaded with executable name and parameter for container"]
