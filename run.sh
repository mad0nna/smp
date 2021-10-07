#!/bin/bash
cd /home/ec2-user/idaten
# Copy Docker .env from S3 bucket
aws s3 cp s3://idaten-creds/.env /home/ec2-user/idaten/.env

# Copy Laravel .env from S3 bucket
aws s3 cp s3://idaten-creds/backend/.env /home/ec2-user/idaten/src/backend/.env

# Build Docker Containers
docker-compose build --no-cache

# Install Composer Packages
docker-compose run --rm composer update

# Build Frontend JS files
docker-compose run --rm node npm run prod

# Run Laravel Migration
docker-compose run --rm php php artisan migrate

# Run docker containers
docker-compose up -d
