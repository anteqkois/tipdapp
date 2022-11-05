FROM node:18.12.0-alpine

WORKDIR /app 

COPY package*.json ./
COPY .npmrc ./
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]