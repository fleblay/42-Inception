FROM debian:buster

RUN apt-get update -y && apt-get install -y redis
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y curl vim procps
RUN mkdir -p /var/run/redis

COPY ./redis.conf /etc/redis/redis.conf
COPY ./redis.sh /
RUN chmod a+x /redis.sh

EXPOSE 6379

ENTRYPOINT ["/redis.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
