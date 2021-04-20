# base image
FROM node:14.15.0-alpine3.12
WORKDIR /var/www/backend
ENV PATH /var/www/backend/node_modules/.bin:$PATH
COPY ./src/backend /var/www/backend
RUN npm install -g cross-env

# Install dependencies
RUN npm install
