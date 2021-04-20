# Sprobe PHP Backend Boilerplate
A base template for Laravel with Blade implementation using `Laravel 6.18.35` with preconfigured `laravel/passport` for API authentication.

## Specifications / Infrastructure Information
- Nginx
- PHP-FPM
- MySQL
- CS-Fixer
- Data Volume
- Composer
- Cron
- Node/NPM
- Redis

## Prerequisites
- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

# Getting Started
Setup the `.env` file for Docker in the root directory  
```
cp .env.example .env
```
Make sure to fillup the following variables
```
ENVIRONMENT=development                 # development/staging/production
PROJECT_NAME=YOUR_PROJECT_NAME_HERE     # Prefix for the Docker Containers to be created
MYSQL_ROOT_PASSWORD=ANY_STRONG_PASSWORD # root password of the root mysql user
MYSQL_DATABASE=YOUR_DATABASE_NAME       # use this value in src/backend/.env
MYSQL_USER=YOUR_DATABASE_USER           # use this value in src/backend/.env
MYSQL_PASSWORD=ANY_STRONG_PASSWORD      # use this value in src/backend/.env
....
....
....
APP_DOMAIN=tcg.local                    # for local development. change accordingly per environment
```
For Local Development in windows, add the following lines to `C:\Windows\System32\drivers\etc\hosts` or `/etc/hosts` for ubuntu  
```
127.0.0.1    tcg.local
```
  
## Build the all containers  
```
docker-compose build
```
To build/rebuild a specific container, run the following command, CONTAINER_NAME is from the `docker-compose.yml`  
```
docker-compose build CONTAINER_NAME
```
Start the containers  
```
docker-compose up -d

# Output
Starting {PROJECT_NAME}_redis    ... done
Starting {PROJECT_NAME}_mysql    ... done
Starting {PROJECT_NAME}_data     ... done
Starting {PROJECT_NAME}_node     ... done
Starting {PROJECT_NAME}_fixer    ... done
Starting {PROJECT_NAME}_composer ... done
Starting {PROJECT_NAME}_cron     ... done
Starting {PROJECT_NAME}_php      ... done
Starting {PROJECT_NAME}_nginx    ... done
```
Run the following command to login to any Docker Container  
```
docker exec -it CONTAINER_NAME bash
```

---

## Composer
Install the composer packages of your project
```
docker-compose run --rm composer install
```
To install new / additional composer packages, run the following command:
```
docker-compose run --rm composer install owner/package
```
To remove a package:
```
docker-compose run --rm composer remove owner/package
```

---

## Setting up Laravel
Create the `.env` file and run the following to generate key for Laravel  
```
docker-compose run php cp .env.example .env
docker-compose run php php artisan key:generate
```
Update the `.env` values especially the database credentials then refresh the config  
```
docker-compose run php php artisan config:clear
```
Run the migration
```
docker-compose run php php artisan migrate:fresh
```
If you have seeders, you can run it by using the following command
```
docker-compose run php php artisan db:seed
```
Run the Laravel Passport installation
```
docker-compose run php php artisan passport:install --force
```
Copy the generated password grant Client ID & Secret in the `.env` file
```
API_CLIENT_ID={COPY FROM TERMINAL}
API_CLIENT_SECRET={COPY FROM TERMINAL}
API_VERSION=v1
```
After setting up all the values in the `.env` file, run the following command to make sure the environment variables are updated successfully.  
```
docker-compose run php php artisan config:clear
```

---

## PSR2 Coding Style
Running the Coding Standards Fixer Container  
  
To check without applying any fixes, run the following command:
```
docker-compose run fixer fix --dry-run -v
```
To fix all your PHP code to adhere the PSR2 Coding style, run:
```
docker-compose run fixer fix
```
To Apply fix only to a specific file
```
docker-compose run fixer fix <<file_name>>
```

---

## Unit Testing
PHPUnit
- Running a Test Case
```
docker-compose run php ./phpunit tests/<<test_file>>
```
- Running the whole Test Suite
```
docker-compose run php ./phpunit
```
The code coverage result will be available at  
<https://APP_DOMAIN/report>
  
The code coverage logs will be available at  
<https://APP_DOMAIN/report/logs>
  

---

## PHP Debugging
**IMPORTANT:** Make sure to disable xDebug in Staging/Production environment for faster php container.

To enable PHP xDebug in your development environment, update the ***.env*** value into:  
```
...
...
ENABLE_XDEBUG=1
```
Accepted Values:
  - ENABLE_XDEBUG=0 - Disable
  - ENABLE_XDEBUG=1 - Enable

Install the VS Code extension **PHP Debug** by **Felix Becker** then restart your VS Code.  

Open the PHP file you want to debug. Add your breakpoints by clicking the left side of the Line Number of the file you want to debug.  

**Breakpoints** are those red dot beside the Line Number. Once you have your breakpoints, press **F5**. Trigger the function by accessing the route via postman/browser.  

---

## PHP OpCache
OPcache improves PHP performance by storing precompiled script bytecode in shared memory, thereby removing the need for PHP to load and parse scripts on each request.  

By default, OPcache is already enabled when the php container is built. Somehow you need to do another step in order get the best performance especially in production site.

During development, update the **.env** file value to
```
OPCACHE_VALIDATE_TIMESTAMPS=1
```
If this is set to 1, you can see the changes directly since PHP will check if you have any changes to your .php files.  

To achieve a 4-5x performance/speed boost in your staging/production site, update the `.env ` file into:
```
OPCACHE_VALIDATE_TIMESTAMPS=0
```
However if you it set this to 0, the system ignores and doesn't check any changes in you PHP files. So if you edited/uploaded any .php files, you will not see it reflected on your site.

Make sure to restart/reload the PHP container after deploying any code changes in staging/production site if you set the value to:
```
OPCACHE_VALIDATE_TIMESTAMPS=0
```

---
  
## NPM Packages
In case you want to use NPM packages and make compile Laravel Mix Assets, you must login to the Node Container included in this base template
```
docker exec -it {PROJECT_NAME}_node sh

# In case the command above fails, run this instead
winpty docker exec -it {PROJECT_NAME}_node sh
``` 
Install all packages in your `src/backend/package.json` file. Make sure you are inside the node container
```
$ docker exec -it {PROJECT_NAME}_node sh
/var/www/backend # npm install
```
For add any additional packages
```
$ docker exec -it {PROJECT_NAME}_node sh
/var/www/backend # npm install some-package-name
```
To compile Laravel Assets both CSS and JS. Run the following commands. 

**Development**

Real time compilation and update
```
$ docker exec -it {PROJECT_NAME}_node sh
/var/www/backend # npm run watch            
```
**Staging/Production**

Minified CSS and JS
```
$ docker exec -it {PROJECT_NAME}_node sh
/var/www/backend # npm run prod
```
