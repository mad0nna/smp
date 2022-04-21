FROM adhocore/lemp:8.0



# Disable unnecessary services of the image
ENV DISABLE=adminer,beanstalkd,elasticsearch,mailcatcher,pgsql


# Build Arguments
ARG ENVIRONMENT
ARG APP_DOMAIN


###########################
## NGINX CONFIGURATION ##
###########################
RUN mkdir -p /var/www/_letsencrypt
ADD ./docker/production/nginx/general.conf /etc/nginx/general.conf
ADD ./docker/production/nginx/letsencrypt.conf /etc/nginx/letsencrypt.conf
ADD ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/production/nginx/php_fastcgi.conf /etc/nginx/php_fastcgi.conf
ADD ./docker/production/nginx/security.conf /etc/nginx/security.conf
ADD ./docker/production/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
####################################

###########################
## CRON CONFIGURATION ##
###########################
RUN touch /run/supervisord.sock
ADD ./docker/production/supervisor.d/laravel-queue.ini /etc/supervisor.d/laravel-queue.ini
RUN echo "* * * * * php /var/www/backend/artisan aimeos:jobs \"order/email/payment\"" >> /etc/crontabs/root
RUN echo "* * * * * php /var/www/backend/artisan aimeos:jobs \"order/cleanup/unfinished\"" >> /etc/crontabs/root
RUN echo "* * * * * php /var/www/backend/artisan schedule:run" >> /etc/crontabs/root
####################################

###########################
## PHP CONFIGURATION ##
###########################
COPY ./docker/production/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini
RUN apk add --no-cache poppler-utils git bash libzip-dev vim pcre-dev ${PHPIZE_DEPS}
# Disable xDebug on Production
RUN mkdir -p /usr/local/etc/php/conf.d/disabled
RUN mv /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/disabled/
# Install New Version of Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

######################
## NODEJS SETUP ##
######################
RUN apk add --update nodejs npm
RUN npm install --global cross-env

#############################
## APPLICATION ##
#############################
RUN mkdir -p /var/www/backend
WORKDIR /var/www/backend
COPY --chown=www-data src/backend /var/www/backend/
RUN chmod -R 777 /var/www/backend/storage/logs /var/www/backend/storage/framework

# Install composer packages
RUN rm -rf /var/www/backend/vendor /var/www/backend/composer.lock
RUN mv /var/www/backend/ext /var/www/backend/ext-temp
RUN composer install
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

# Expose the port nginx is reachable on
EXPOSE 80 443 3306 6379

ENTRYPOINT ["/docker-entrypoint.sh"]
ADD ./docker/production/scripts/configure.sh /configure.sh
RUN ["chmod", "+x", "/configure.sh"]
CMD /configure.sh