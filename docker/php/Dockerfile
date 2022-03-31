FROM php:7.4.13-fpm-alpine3.12
RUN apk update
RUN apk add --no-cache poppler-utils git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
RUN docker-php-ext-install zip mysqli pdo_mysql
RUN pecl install redis \
    && docker-php-ext-enable redis
RUN printf '[PHP]\ndate.timezone = "Asia/Tokyo"\n' > /usr/local/etc/php/conf.d/tzone.ini
COPY ./docker/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Setup xDebug
ARG ENABLE_XDEBUG
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
ADD ./docker/php/scripts/configure-xdebug.sh /configure-xdebug.sh
RUN ["chmod", "+x", "/configure-xdebug.sh"]
RUN /configure-xdebug.sh
RUN apk del pcre-dev ${PHPIZE_DEPS}

# Setup Opcache
ARG OPCACHE_VALIDATE_TIMESTAMPS
COPY ./docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
ADD ./docker/php/scripts/configure-opcache.sh /configure-opcache.sh
RUN ["chmod", "+x", "/configure-opcache.sh"]
RUN /configure-opcache.sh
