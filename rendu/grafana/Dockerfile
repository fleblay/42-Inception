FROM debian:buster

RUN apt-get update -y && apt-get install -y gnupg2 curl software-properties-common
RUN curl https://packages.grafana.com/gpg.key | apt-key add -
RUN add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
RUN apt-get update -y && apt-get install -y grafana
RUN mkdir -p /var/run/grafana
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y vim curl procps
COPY ./grafana.sh /
COPY ./prom.yaml /usr/share/grafana/conf/provisioning/datasources/prom.yaml
COPY ./grafana.ini /etc/grafana/grafana.ini
RUN chmod a+x /grafana.sh
RUN chmod a+r /usr/share/grafana/conf/provisioning/datasources/prom.yaml /etc/grafana/grafana.ini

EXPOSE 3000

ENTRYPOINT ["/grafana.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
