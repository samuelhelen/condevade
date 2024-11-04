# Dockerfile reference:
# https://docs.docker.com/engine/reference/builder/
# Best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/


FROM node:latest AS build-stage
WORKDIR /root/frontend
COPY ./frontend/package*.json .
RUN [ "npm", "install", "--silent" ]
COPY ./frontend/ .
RUN [ "npm", "run", "build" ]
# For manual testing:
# COPY ./frontend/dist /root/frontend/dist


# apache2-utils for installing htpasswd
# RUN [ "apt", "update" ]
# RUN [ "apt", "install", "-y", "apache2-utils" ]


# "Deployment" mode
# https://hub.docker.com/_/nginx/
FROM nginx:latest AS final-stage
# FROM nginx:stable-alpine
# FROM nginx:stable

# systemctl for shutting down the container
RUN [ "apt", "update" ]
RUN [ "apt", "install", "-y", "systemctl" ]

# Run more than one "CMD"
# https://docs.docker.com/engine/containers/multi-service_container/#use-bash-job-controls
RUN [ "apt", "install", "-y", "supervisor" ]
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Requires you to have built the frontend: [ frontend]$ npm run build
# COPY ./frontend/dist /var/www
# Does not require building the frontend manually:
COPY --from=build-stage /root/frontend/dist /var/www

# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --chmod=744 nginx_startup.sh /root/nginx_startup.sh
COPY --chmod=744 nginx_shutdown.sh /root/nginx_shutdown.sh

COPY htpasswd /etc/nginx/.htpasswd

# EXPOSE 80
EXPOSE 8198

# CMD [ "nginx", "-g", "daemon off;" ]
CMD ["/usr/bin/supervisord"]

