
FROM node:latest
WORKDIR /usr/src/app

RUN [ "apt", "update" ]
RUN [ "apt", "install", "iproute2", "-y" ]

COPY . .
RUN [ "npm",  "install" ]
# RUN npm ci --omit=dev

EXPOSE 8199
CMD [ "node", "src/index.js" ]
