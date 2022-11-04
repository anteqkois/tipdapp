# FROM node:18.12.0
FROM node:17.3

RUN apt-get update && apt-get -y install openssl

WORKDIR /app 

# RUN npm install @prisma/client

COPY package*.json ./
COPY .npmrc ./
RUN npm install

# COPY prisma ./prisma/
COPY prisma ./prisma/
# COPY prisma/.env ./prisma/
RUN npx prisma generate
# RUN npm run prisma-update

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]