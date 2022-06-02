#!/bin/bash

MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-1234567890}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-123456}


# init nginx
if [ ! -d "/var/tmp/nginx/client_body" ]; then
  mkdir -p /run/nginx /var/tmp/nginx/client_body
  chown nginx:nginx -R /run/nginx /var/tmp/nginx/
fi

SQL=$(mktemp)

  mkdir -p /run/mysqld /var/lib/mysql
  chown mysql:mysql -R /run/mysqld /var/lib/mysql
  sed -i -e 's/skip-networking/skip-networking=0/' /etc/my.cnf.d/mariadb-server.cnf
  mysql_install_db --user=mysql --datadir=/var/lib/mysql

  if [ -n "$MYSQL_DATABASE" ]; then
    echo "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE CHARACTER SET utf8 COLLATE utf8_general_ci;" >> $SQL
  fi

  MYSQL_DATABASE=${MYSQL_DATABASE:-*}

  if [ -n "MYSQL_USER" ]; then
    echo "GRANT ALL ON $MYSQL_DATABASE.* to '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';" >> $SQL
    echo "GRANT ALL ON $MYSQL_DATABASE.* to '$MYSQL_USER'@'127.0.0.1' IDENTIFIED BY '$MYSQL_PASSWORD';" >> $SQL
    echo "GRANT ALL ON $MYSQL_DATABASE.* to '$MYSQL_USER'@'::1' IDENTIFIED BY '$MYSQL_PASSWORD';" >> $SQL
  fi

  echo "ALTER user 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';" >> $SQL
  echo "DELETE FROM mysql.user WHERE User = '' OR Password = '';" >> $SQL
  echo "FLUSH PRIVILEGES;" >> $SQL

  cat "$SQL" | mysqld --user=mysql --bootstrap --silent-startup --skip-grant-tables=FALSE

  rm -rf ~/.mysql_history ~/.ash_history $SQL
  touch /run/mysqld/.init

exec "$@"
