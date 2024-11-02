# Dockerfile reference:
# https://docs.docker.com/engine/reference/builder/
# Best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/


# First, you need to run the command
# npm run build

# docker build --rm -f Dockerfile -t frontend:latest .
# docker run --rm -d -p 80:80 frontend:latest



# Development mode, not really needed for anything:
# docker run --rm -d -p 80:3000 frontend:latest
# Fetch the Node Docker image with tag "latest" from Docker Hub.
#FROM node:latest
#WORKDIR /usr/src/app
#COPY . .
#RUN npm install
#EXPOSE 3000
#CMD ["npm", "start"]



# "Deployment" mode
# https://hub.docker.com/_/nginx/

FROM nginx:latest
# FROM nginx:stable-alpine
# FROM nginx:stable

# COPY ./build /var/www
# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
EXPOSE 8198

CMD ["nginx", "-g", "daemon off;"]

