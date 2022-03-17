FROM php:7.4-fpm-alpine
RUN apk update
RUN apk add --no-cache poppler-utils git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
RUN apk add --no-cache \
      freetype \
      libjpeg-turbo \
      libpng \
      freetype-dev \
      libjpeg-turbo-dev \
      libpng-dev \
    && docker-php-ext-configure gd \
      --with-freetype=/usr/include/ \
      # --with-png=/usr/include/ \ # No longer necessary as of 7.4; https://github.com/docker-library/php/pull/910#issuecomment-559383597
      --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && apk del --no-cache \
      freetype-dev \
      libjpeg-turbo-dev \
      libpng-dev \
    && rm -rf /tmp/*
RUN apk add --no-cache \
    oniguruma-dev \
    && docker-php-ext-install mbstring \
    && docker-php-ext-enable mbstring \
    && rm -rf /tmp/*
RUN apk --no-cache add \
    icu-dev \
    gettext \
    gettext-dev
RUN docker-php-ext-configure intl \
    && docker-php-ext-configure gettext \
    && docker-php-ext-install \
    intl \
    gettext
RUN apk add --no-cache git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
RUN docker-php-ext-install zip mysqli pdo_mysql
RUN docker-php-ext-configure intl && docker-php-ext-install intl
RUN pecl install redis \
    && docker-php-ext-enable redis
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
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
