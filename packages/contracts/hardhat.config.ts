// import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "@nomiclabs/hardhat-ethers";

    // "@nomiclabs/hardhat-etherscan": "^3.1.6",
    // "@openzeppelin/contracts": "^4.8.0",
    // "@typechain/ethers-v5": "^10.2.0",


import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "solidity-coverage";

import dotenv from "dotenv";

dotenv.config({
  path: process.env.dotenv_config_path
    ? process.env.dotenv_config_path
    : ".env.development",
});

const config: HardhatUserConfig & any = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      loggingEnabled: true,
      // you can't use auto mining when try to run test 
      mining: {
        auto: false,
        interval: [2000, 5000],
      },
      // gas: "auto",
      accounts: [
        {
          privateKey: process.env.DEPLOYER_WALLET_PRIVATE_KEY,
          balance: "100000000000000000000",
        },
        {
          privateKey: process.env.SIGNER_WALLET_PRIVATE_KEY,
          balance: "100000000000000000000",
        },
        {
          privateKey: process.env.THIRD_WALLET_PRIVATE_KEY,
          balance: "100000000000000000000",
        },
      ],
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 16236055,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    maxMethodDiff: 20,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH",
    // gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
    // token: 'MATIC',
    // gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
    // token: 'BNB',
    // gasPriceApi: 'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
    // gasPrice: 21,
  },
};

export default config;
