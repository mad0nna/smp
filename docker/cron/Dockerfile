FROM php:7.4.13-fpm-alpine3.12
RUN apk update
RUN apk add git bash
RUN echo "* * * * * www-data php /var/www/backend/artisan schedule:run >> /dev/null 2>&1" >> /etc/crontabs/root
RUN docker-php-ext-install mysqli pdo_mysql
RUN printf '[PHP]\ndate.timezone = "Asia/Tokyo"\n' > /usr/local/etc/php/conf.d/tzone.ini
COPY ./src/backend /var/www/backend
RUN chown -R www-data:www-data /var/www/backend
ADD ./docker/cron/scripts/configure.sh /configure.sh
RUN ["chmod", "+x", "/configure.sh"]
CMD /configure.sh
