FROM node:18.12.0-slim

RUN apt-get update && apt-get -y install openssl

WORKDIR /app 

COPY package*.json ./
COPY .npmrc ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]