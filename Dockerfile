FROM debian:buster
RUN apt-get update -y && apt-get install -y mariadb-client mariadb-server vim
COPY rendu/maria-db.sh /
RUN chmod a+x /maria-db.sh
ENTRYPOINT ["/maria-db.sh"]
CMD ["echo this should be overloaded with executable name and parameter for container"]
