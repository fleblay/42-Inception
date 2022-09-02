FROM debian:buster

RUN apt-get update -y && apt-get install -y nginx openssl vim curl procps
#RUN apt-get update -y && apt-get install -y nginx openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=FR/ST=IDF/O=Fredo&The_Wailers/CN=localhost" -keyout /etc/ssl/private/nginx.key -out /etc/ssl/certs/nginx.crt
COPY ./nginx.sh /
COPY ./nginx_default_conf.txt /
RUN chmod a+x /nginx.sh
RUN chmod a+r /nginx_default_conf.txt
RUN mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
RUN cat < /nginx_default_conf.txt > /etc/nginx/sites-available/default


VOLUME wp_files
EXPOSE 443

ENTRYPOINT ["/nginx.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
