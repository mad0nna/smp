FROM adhocore/lemp:8.0

# Disable unnecessary services of the image
ENV DISABLE=adminer,beanstalkd,elasticsearch,mailcatcher,pgsql

# Build Arguments
ARG ENVIRONMENT
ARG APP_DOMAIN

###########################
## NGINX CONFIGURATION   ##
###########################
RUN mkdir -p /var/www/_letsencrypt
ADD ./docker/production/nginx/general.conf /etc/nginx/general.conf
ADD ./docker/production/nginx/letsencrypt.conf /etc/nginx/letsencrypt.conf
ADD ./docker/production/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/production/nginx/php_fastcgi.conf /etc/nginx/php_fastcgi.conf
ADD ./docker/production/nginx/security.conf /etc/nginx/security.conf
ADD ./docker/production/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
####################################
ADD ./docker/production/supervisor.d/laravel-queue.ini /etc/supervisor.d/laravel-queue.ini

###########################
## PHP CONFIGURATION     ##
###########################
COPY ./docker/production/php/uploads.ini /usr/local/etc/php/conf.d/uploads.ini
# Disable xDebug on Production
RUN mkdir -p /usr/local/etc/php/conf.d/disabled
RUN mv /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/disabled/
# Install New Version of Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

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
RUN composer install

# Generate passport keys
RUN php artisan passport:keys

# Build NPM Production
RUN rm -rf /var/www/backend/node_modules /var/www/backend/package-lock.json
RUN npm install
RUN npm run prod

# Expose the port nginx is reachable on
EXPOSE 80 443 3306 6379
