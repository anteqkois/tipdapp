# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.4](https://github.com/anteqkois/qoisdapp/compare/v0.1.3...v0.1.4) (2022-04-16)


### Features

* **donateeth:** handle donate in eth and add ability to check if donate have minimal worth ([6fcc507](https://github.com/anteqkois/qoisdapp/commit/6fcc507328cb07939cefaa446eb61799941ba82b))
* **qoisdapp:** add migrateAddress veriable, block registerCustomer if migrate is active ([9c901ed](https://github.com/anteqkois/qoisdapp/commit/9c901edd51b992d844f18271ed93cfd5f2bece61))
* **qoisdapp:** add withdrawETH method, test it ([7d68312](https://github.com/anteqkois/qoisdapp/commit/7d683122fb150906b26ae2fbd005b41ba14e9053))
* **qoisdapp:** add withdrawManyERC20 method, test it ([86cdc57](https://github.com/anteqkois/qoisdapp/commit/86cdc570830730a7787b3ebb8aebcc6a4d86e994))
* **qoisdapp:** change architecture main smart contract to use openzeppelin-upgradelity features ([345f104](https://github.com/anteqkois/qoisdapp/commit/345f104a5c50e524e8010c0c1e0c0f7917d8f6e0))
* **qoisdapp:** change handle oracle data to use packing bytes32 ([097d5b7](https://github.com/anteqkois/qoisdapp/commit/097d5b72ee24af9fb35e9787f7d20f7fe2f11b70))
* **qoistipv2:** add ability to upgrade smart contract and test it ([6a2085a](https://github.com/anteqkois/qoisdapp/commit/6a2085a5afc193a1a5d8034b8aecb03df3b9f670))
* **storeoracle:** add ability to pack oracle data off-chain ([04f719f](https://github.com/anteqkois/qoisdapp/commit/04f719f696f375f56bc892ae7745eaf980189edb))
* **storeoracle:** add method to handle packing data with uint256 ([d29317c](https://github.com/anteqkois/qoisdapp/commit/d29317c72b0562057964320497ba64e0aed82c71))
* **storeoracle:** create function to pack and unpack oracle data using bytes32 ([7a9029c](https://github.com/anteqkois/qoisdapp/commit/7a9029c87f497b7f3e9d685bae5913e7b926b6b3))
* **withdraw:** handle withdraw one token ([a6d3457](https://github.com/anteqkois/qoisdapp/commit/a6d345796d6889b6843e267164c4de19de543990))

### [0.1.3](https://github.com/anteqkois/qoisdapp/compare/v0.1.2...v0.1.3) (2022-04-03)


### Features

* **contract:** add Qoistip, ANQToken contract, compile they, install openzeppelin ([78b3527](https://github.com/anteqkois/qoisdapp/commit/78b3527c61286bafaf40ee3137adbea33648c974))
* **customertoken:** add CustomerToken smart contract ([ac9af2a](https://github.com/anteqkois/qoisdapp/commit/ac9af2a6c8f53866741e3d1d3944822394dd8565))
* **donateerc20:** handle donate ERC20 in ETH price ([080b7ea](https://github.com/anteqkois/qoisdapp/commit/080b7ea667fcf5529e783e2e126d731eb41d18fe))
* **oracle:** add Uniswap getPrice function ([26c9eb3](https://github.com/anteqkois/qoisdapp/commit/26c9eb35f2b565d51387da25a665e72c2c3e072d))
* **price oracle:** add  function to calculate amount token to mint from donate, test it ([d855ef6](https://github.com/anteqkois/qoisdapp/commit/d855ef6cd958d52062d16999ef69f2a895ef738b))
* **qoisdapp:** add hardhat_impersonateAccount, use it, first ERC20 donate test ([44c98bf](https://github.com/anteqkois/qoisdapp/commit/44c98bfdcab667aa7d68463746a749dbf9b72427))
* **qoisdapp:** add oracle struct and method to handle suporrrt token ([9e26820](https://github.com/anteqkois/qoisdapp/commit/9e26820b043aed6d1951c9b91938484e7866cc0f))
* **qoisdapp:** change suportedTokens method, donate and add ability to register, mint without test ([a6df38f](https://github.com/anteqkois/qoisdapp/commit/a6df38f44a250a1e2b63c1313f93081e42b29f4b))
* **qoisdapp:** instal Uniswap core smartcontract, add function to get token price from Uniswap ([47cb5c3](https://github.com/anteqkois/qoisdapp/commit/47cb5c3f3cf8a6c5fee99b77fd977c0867f6b527))
* **qoisdapp:** install hardhat-gas-reporter to check uses gas, add .env file and config ([56c4c17](https://github.com/anteqkois/qoisdapp/commit/56c4c170d0d5936d633a0adf083f79447d97d442))
* **qoisdapp:** register new customer ability, create customer token ([11bbe65](https://github.com/anteqkois/qoisdapp/commit/11bbe653ae259b4aea9d6a22e92ed8cff9af030d))
* **qoisdapp:** start test registerCustomer ([a285f7c](https://github.com/anteqkois/qoisdapp/commit/a285f7c406eaab3e3161eb09032317f3ba8fe569))
* **qoistip smart contract:** handle fee, suported tokens and donate in simple way, Test it ([0de3c02](https://github.com/anteqkois/qoisdapp/commit/0de3c023233ceaafc8d5d7d4b50d2e37b29f2bbf))
* **qoistip smart contract:** handle transation fee, test work with indivisible numbers ([dafa8dd](https://github.com/anteqkois/qoisdapp/commit/dafa8dd7ebb373ece0dc65e4bf37b0e2c79951c4))
* **qoistip:** add donate function, test it ([1c66943](https://github.com/anteqkois/qoisdapp/commit/1c669437ceb179128da7548444d1e8ab85c4cc8a))
* **qoistip:** add withdraw ETH by customer, test it ([d08a974](https://github.com/anteqkois/qoisdapp/commit/d08a9742230561971890af9cd30e85f820fc0465))
* **qoistip:** add withdraw function, test it ([b96c0a8](https://github.com/anteqkois/qoisdapp/commit/b96c0a8103c4c6668386a2255f73371231dee648))
* **qoistip:** handle donate in ETH, test it, change some names in Qoistip smart contract ([b9cc2b7](https://github.com/anteqkois/qoisdapp/commit/b9cc2b75deb3985ff40152be82aeb96e228a51c8))


### Bug Fixes

* **qoisdapp:** choose option to mint ([b35a7f3](https://github.com/anteqkois/qoisdapp/commit/b35a7f35be478757862acf5c996ae6df510fa3fb))
* **qoisdapp:** refractor test file ([7ca2c3f](https://github.com/anteqkois/qoisdapp/commit/7ca2c3f0ff01883159d4f923d89cd70a70dd546c))

### [0.1.2](https://github.com/anteqkois/qoisdapp/compare/v0.1.1...v0.1.2) (2022-03-12)


### Features

* **app:** add hardhat and refractore folder architecture ([3a94c81](https://github.com/anteqkois/qoisdapp/commit/3a94c81a2ecb30bc3b35aeac9a90dd90235257f8))
* **app:** add hardhat and test it ([ad8db78](https://github.com/anteqkois/qoisdapp/commit/ad8db78060f37d91320f100ab88f05e39484750c))
* **app:** add redux, redux toolkit and axios ([2e7a0ff](https://github.com/anteqkois/qoisdapp/commit/2e7a0ff4f4c236c8d1efe30046a355960b60109c))

### 0.1.1 (2022-03-05)


### Features

* **app:** add standard-version ([38997d9](https://github.com/anteqkois/nextjs-boilerplate/commit/38997d9e7cf955a4dca008c820d1ef2173b0112c))


### Bug Fixes

* add script ([190fe37](https://github.com/anteqkois/nextjs-boilerplate/commit/190fe377fb4fea3c5c620702abff3ca79ae6296a))
* **app:** install commitizen and init ([1eea755](https://github.com/anteqkois/nextjs-boilerplate/commit/1eea755e938ed0bf653ffcd90d3bfc78e1c48c24))
