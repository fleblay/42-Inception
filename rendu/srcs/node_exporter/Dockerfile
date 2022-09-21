FROM debian:buster

RUN apt-get update -y && apt-get install -y prometheus-node-exporter
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y vim curl procps
COPY ./node_exporter.sh /
RUN chmod a+x /node_exporter.sh

#VOLUME /proc
#VOLUME /sys
#VOLUME /
EXPOSE 9100

ENTRYPOINT ["/node_exporter.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
