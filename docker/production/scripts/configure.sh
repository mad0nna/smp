#!/bin/bash
crond start
/usr/bin/supervisord -n -j /supervisord.pid
tail -f /dev/null