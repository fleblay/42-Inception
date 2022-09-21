FROM debian:buster

ARG FTP_USERNAME \
	FTP_PASS \
	PUBLIC_HOST

ENV PUBLIC_HOST=$PUBLIC_HOST

RUN apt-get update -y && apt-get install -y vsftpd
#Extra tools for debug
#RUN apt-get update -y && apt-get install -y vim procps
COPY ./vsftp.sh /
COPY ./vsftpd.conf /
RUN chmod a+x /vsftp.sh
RUN chmod a+r /vsftpd.conf
RUN mv /etc/vsftpd.conf /etc/vsftpd.conf.backup
RUN cat < /vsftpd.conf > /etc/vsftpd.conf
RUN echo pasv_address=$PUBLIC_HOST >> /etc/vsftpd.conf
RUN mkdir -p /var/run/vsftpd/empty /var/run/vsftpd/
RUN echo $FTP_USERNAME > /etc/vsftpd.userlist
RUN useradd $FTP_USERNAME
RUN echo "${FTP_USERNAME}:${FTP_PASS}" | chpasswd
RUN usermod --home /var/www/html $FTP_USERNAME

VOLUME wp_files
EXPOSE 21
EXPOSE 10100:10102

ENTRYPOINT ["/vsftp.sh"]
#CMD arg should be overloaded with executable name and parameter for container
CMD [""]
