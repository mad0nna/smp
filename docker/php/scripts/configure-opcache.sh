#!/bin/bash

# Configure OPCACHE For faster Performance based on environment
docker-php-ext-install opcache
sed -i "s/^opcache.validate_timestamps=\([ 0-9a-zA-Z]*$\)/opcache.validate_timestamps=$OPCACHE_VALIDATE_TIMESTAMPS/g" /usr/local/etc/php/conf.d/opcache.ini

# Add Composer to container

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

php composer-setup.php

php -r "unlink('composer-setup.php');"

mv composer.phar /usr/local/bin/composer