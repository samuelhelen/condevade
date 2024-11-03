# Dockerfile reference:
# https://docs.docker.com/engine/reference/builder/
# Best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

# "Deployment" mode
# https://hub.docker.com/_/nginx/

FROM nginx:latest
# FROM nginx:stable-alpine
# FROM nginx:stable

# apache2-utils for installing htpasswd

# Requires you to have built the frontend: [ frontend]$ npm run build
COPY ../frontend/dist /var/www

# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY htpasswd /etc/nginx/.htpasswd

# EXPOSE 80
EXPOSE 8198

CMD ["nginx", "-g", "daemon off;"]

