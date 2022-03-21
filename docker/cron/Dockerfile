FROM php:7.4.13-fpm-alpine3.12
RUN apk update
RUN apk add --no-cache git bash supervisor pcre-dev ${PHPIZE_DEPS}
RUN echo "* * * * * cd /var/www/backend && php artisan aimeos:jobs \"order/email/delivery order/email/payment\"" >> /etc/crontabs/root
RUN echo "* * * * * cd /var/www/backend && php artisan aimeos:jobs \"order/cleanup/unfinished\"" >> /etc/crontabs/root
RUN echo "* * * * * cd /var/www/backend && php artisan schedule:run" >> /etc/crontabs/root
RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-install mysqli pdo_mysql
RUN printf '[PHP]\ndate.timezone = "Asia/Tokyo"\n' > /usr/local/etc/php/conf.d/tzone.ini
COPY ./src/backend /var/www/backend
RUN touch /run/supervisord.sock
COPY ./docker/cron/conf/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chown -R www-data:www-data /var/www/backend
ADD ./docker/cron/scripts/configure.sh /configure.sh
RUN ["chmod", "+x", "/configure.sh"]
CMD /configure.sh
