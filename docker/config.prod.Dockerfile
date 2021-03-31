FROM php:8.0-apache
COPY ./src/ /var/www/html/
RUN a2enmod rewrite
RUN service apache2 restart