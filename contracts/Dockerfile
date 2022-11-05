FROM node:18.12.0-alpine

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN apk update && apk add --no-cache \
#  python3 \
#  build-essential

WORKDIR /app 

COPY package*.json ./
COPY .npmrc ./
RUN npm install

RUN npm install hardhat
COPY entrypoint.sh ./

COPY . .

ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]