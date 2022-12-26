# node alpine not work with this prisma version
# FROM node:18.12.0-alpine
# # FROM --platform=arm64 node:18.12.0-alpine

# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh
# RUN apk add --update --no-cache libc6-compat
# # RUN apk add --update --no-cache openssl1.1-compat-dev

FROM node:18.12.0-slim

RUN apt-get update && apt-get -y install openssl
RUN apt-get -y install git

WORKDIR /app 

# COPY package*.json ./
COPY package.json ./
COPY .npmrc ./
RUN npm install -D @swc/cli @swc/core
# RUN npm i -D @swc/cli @swc/core @swc/core-linux-musl
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

# CMD ["npm", "start"]
# CMD ls
# CMD ["npm", "run", "dev"]

# MUST TO USE docker buildx build --platform=linux/amd64 -t anteqkois:qoisdapp-dapp dapp/