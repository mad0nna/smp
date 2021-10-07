#!/bin/bash
BUILD_DOCKER=false
RUN_LARAVEL_MIGRATION=false
RUN_LARAVEL_MIGRATE_FRESH=false
RUN_LARAVEL_DB_SEEDERS=false
RUN_COMPOSER_INSTALL_PACKAGES=false
DEPLOY_CHANGES=false

################################################################################
# Help                                                                         #
################################################################################
Help()
{
   # Display Help
   echo "Deployment Script Guide for iDaten Application"
   echo
   echo "Syntax: ./deploy.sh -d"
   echo
   echo "Options:"
   echo "-d     Start deployment."
   echo "-b     Stop all running docker containers, force rebuild then start all docker containers again."
   echo "-m     Run Laravel Migrations without dropping the tables in the database."
   echo "-f     Run Laravel Fresh Migration dropping all existing tables in the database."
   echo "-s     Run All Laravel Database Seeders."
   echo "-c     Run Composer to install packages."
   echo
}

################################################################################
# Options                                                                      #
################################################################################
while getopts :dbmfsc flag
do
    case "${flag}" in
        d) DEPLOY_CHANGES=true;;
        b) BUILD_DOCKER=true;;
        m) RUN_LARAVEL_MIGRATION=true;;
        f) RUN_LARAVEL_MIGRATE_FRESH=true;;
        s) RUN_LARAVEL_DB_SEEDERS=true;;
        c) RUN_COMPOSER_INSTALL_PACKAGES=true;;
    esac
done

# Show Help if only if deployment flag is not set to true
if [ ! "$DEPLOY_CHANGES" = true ] ; then
    Help
    exit 1
fi

# Navigate to expected deployment directory
cd /home/ec2-user/idaten

if [ "$BUILD_DOCKER" = true ] ; then
    # stop running containers
    docker-compose stop
    
    # build containers
    docker-compose build --no-cache

    # start all containers
    docker-compose up -d
fi

# Stash any changed file in server include untracked
git stash -u

# Fetch & merge changes changes from repository
git fetch origin
git merge origin/master

# Drop all Tables and run migration
if [ "$RUN_LARAVEL_MIGRATE_FRESH" = true ] ; then
    echo "Running Laravel Fresh Database Migration ..."
    docker-compose run --rm php php artisan migrate:fresh
    docker-compose run --rm php php artisan passport:install --force
fi

# Run Laravel migration without dropping tables
if [ "$RUN_LARAVEL_MIGRATION" = true ] ; then
    echo "Running Laravel Database Migration ..."
    docker-compose run --rm php php artisan migrate --force
fi

# Run all database seeders
if [ "$RUN_LARAVEL_DB_SEEDERS" = true ] ; then
    echo "Running Laravel Database Seeder ..."
    docker-compose run --rm php php artisan db:seed
fi

# Run Composer install
if [ "$RUN_COMPOSER_INSTALL_PACKAGES" = true ] ; then
    docker-compose run --rm composer install --ignore-platform-reqs
fi

echo "Building Frontend Assets ..."

# Build Frontend JS files
docker-compose run --rm node npm run prod

echo "Deployment completed."
