FROM phusion/baseimage:0.10.0

ENV DEBIAN_FRONTEND noninteractive
# letsencrypt variables
ENV LETSENCRYPT_HOME /etc/letsencrypt
ENV DOMAINS gronade.com
ENV WEBMASTER_MAIL dima.galat@gronade.com

# Manually set the apache environment variables in order to get apache to work immediately.
RUN echo $WEBMASTER_MAIL > /etc/container_environment/WEBMASTER_MAIL && \
    echo $DOMAINS > /etc/container_environment/DOMAINS && \
    echo $LETSENCRYPT_HOME > /etc/container_environment/LETSENCRYPT_HOME

# Copy init script
COPY my_init /sbin/

# Install apache, PHP, and supplimentary programs. openssh-server, curl, and lynx-cur are for debugging the container.
RUN add-apt-repository ppa:certbot/certbot -y && \
    apt-get update && apt-get -y upgrade && \
    apt-get -y install apache2 php7.0 php7.0-mysql libapache2-mod-php7.0 curl lynx-cur python-certbot-apache && \
    a2enmod php7.0 && a2enmod rewrite && a2enmod ssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Update the PHP.ini file, enable <? ?> tags and quieten logging.
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.0/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.0/apache2/php.ini
RUN echo "ServerName $(ip route get 8.8.8.8 | awk '{print $NF; exit}')" >> /etc/apache2/apache2.conf
RUN chmod +x /sbin/my_init
# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# Expose apache.
EXPOSE 80 443

# Copy this repo into place.
ADD www /var/www/site

# Update the default apache site with the config we created.
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

CMD ["/sbin/my_init"]
