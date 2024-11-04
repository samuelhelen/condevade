#!/bin/bash
# Used for stoping the nginx server if all service1 replicas are unavailable
# curl -o /dev/null -s -w "%{http_code}\n" http://service1:8199/api

while true; do
	s1=`curl -o /dev/null -s -w "%{http_code}" http://condevade-service1-1:8199/api`
	s2=`curl -o /dev/null -s -w "%{http_code}" http://condevade-service1-2:8199/api`
	s3=`curl -o /dev/null -s -w "%{http_code}" http://condevade-service1-3:8199/api`

	if [ "$s1" != "200" ] && [ "$s2" != "200" ] && [ "$s3" != "200" ]; then
		nginx -s quit
		systemctl halt --force
	fi

	sleep 12
done


