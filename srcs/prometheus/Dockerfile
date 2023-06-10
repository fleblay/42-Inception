FROM debian:buster

RUN apt-get update -y && apt-get install -y prometheus curl
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y vim curl procps
COPY ./prometheus.sh /
COPY ./prometheus.yml /etc/prometheus/prometheus.yml
RUN chmod a+x /prometheus.sh
RUN chmod a+r /etc/prometheus/prometheus.yml
RUN curl -L -O https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz
RUN tar xvfz prometheus-2.37.0.linux-amd64.tar.gz
RUN mv prometheus-2.37.0.linux-amd64/prometheus /usr/bin/

VOLUME prometheus_db
EXPOSE 9090

ENTRYPOINT ["/prometheus.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
