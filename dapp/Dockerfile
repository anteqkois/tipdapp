FROM node:18.12.0
# FROM node:17.3

WORKDIR /app 

COPY package*.json ./
COPY .npmrc ./
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]