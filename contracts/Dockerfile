FROM node:18.12.0
# FROM node:17.3

WORKDIR /app 

COPY package*.json ./
COPY .npmrc ./
RUN npm install

RUN npm install hardhat
COPY entrypoint.sh ./

COPY . .

ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
# CMD bash entrypoint.sh
# ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
# CMD npm run dev
# CMD npx hardhat node && sleep 12 & npm run deploy-dev
# npx hardhat node & sleep 12 && npm run deploy-dev