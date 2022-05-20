FROM php:8.0.5-fpm-alpine

RUN apk update

RUN \
  # install
  apk add -U --no-cache \
    mysql mysql-client \
    nano \
    nginx \
    redis \
    supervisor \
    poppler-utils git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
RUN docker-php-ext-install zip mysqli pdo_mysql
RUN apk --no-cache add \
    icu-dev \
    gettext \
    gettext-dev
RUN docker-php-ext-configure intl \
    && docker-php-ext-configure gettext \
    && docker-php-ext-install \
    intl \
    gettext
RUN pecl install redis \
    && docker-php-ext-enable redis
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/doc/* /usr/share/man/*

###########################
## NGINX CONFIGURATION   ##
###########################
ADD ./docker/production/nginx/general.conf /etc/nginx/general.conf
ADD ./docker/production/nginx/letsencrypt.conf /etc/nginx/letsencrypt.conf
ADD ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/production/nginx/php_fastcgi.conf /etc/nginx/php_fastcgi.conf
ADD ./docker/production/nginx/security.conf /etc/nginx/security.conf
ADD ./docker/production/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# supervisor config
COPY \
    ./docker/production/nginx/nginx.ini \
    ./docker/production/php/php-fpm.ini \
    ./docker/production/redis/redis.ini \
    ./docker/production/mysql/mysql.ini \
    /etc/supervisor.d/

###########################
## PHP CONFIGURATION     ##
###########################
COPY ./docker/production/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini
# RUN apk add --no-cache poppler-utils git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
# Disable xDebug on Production
RUN mkdir -p /usr/local/etc/php/conf.d/disabled
# RUN mv /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/disabled/
# Install New Version of Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

###########################
## CRON CONFIGURATION ##
###########################
RUN touch /run/supervisord.sock
ADD ./docker/production/supervisor.d/laravel-queue.ini /etc/supervisor.d/laravel-queue.ini
RUN echo "* * * * * php /var/www/backend/artisan aimeos:jobs \"order/email/payment\"" >> /etc/crontabs/root
RUN echo "* * * * * php /var/www/backend/artisan aimeos:jobs \"order/cleanup/unfinished\"" >> /etc/crontabs/root
RUN echo "* * * * * php /var/www/backend/artisan schedule:run" >> /etc/crontabs/root

######################
## NODEJS SETUP     ##
######################
RUN apk add --update nodejs npm
RUN npm install --global cross-env

#############################
## APPLICATION             ##
#############################
RUN mkdir -p /var/www/backend
WORKDIR /var/www/backend
COPY --chown=www-data src/backend /var/www/backend/
RUN chmod -R 777 /var/www/backend/storage/logs /var/www/backend/storage/framework

# Install composer packages
RUN rm -rf /var/www/backend/vendor /var/www/backend/composer.lock
RUN mv /var/www/backend/ext /var/www/backend/ext-temp
RUN composer install --ignore-platform-reqs
RUN rm -rf /var/www/backend/ext
RUN mv /var/www/backend/ext-temp /var/www/backend/ext
RUN composer dump-autoload
RUN mkdir -p /var/www/backend/public/aimeos /var/www/backend/public/vendor
RUN chmod -R 777 /var/www/backend/public/aimeos /var/www/backend/public/vendor

# Generate passport keys
RUN php artisan passport:keys

# Build NPM Production
RUN rm -rf /var/www/backend/node_modules /var/www/backend/package-lock.json
RUN npm install
RUN npm run prod

# entrypoint
COPY ./docker/production/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# ports
EXPOSE 9000 6379 3306 80

# commands
ENTRYPOINT ["/docker-entrypoint.sh"]
ADD ./docker/production/scripts/configure.sh /configure.sh
RUN ["chmod", "+x", "/configure.sh"]
CMD /configure.sh
