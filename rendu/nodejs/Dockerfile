FROM debian:buster

RUN apt-get update -y && apt-get install -y nodejs npm
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y vim procps
COPY ./nodejs.sh /
COPY ./solong_files.tar /
RUN tar xvf solong_files.tar --strip-components=1
RUN chmod a+x /nodejs.sh
RUN chmod a+r /solong_files.tar
RUN npm install

VOLUME nodejs_maps
EXPOSE 8080

ENTRYPOINT ["/nodejs.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
