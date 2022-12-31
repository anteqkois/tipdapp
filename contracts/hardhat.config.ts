import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

import dotenv from "dotenv";

dotenv.config({
  path: process.env.dotenv_config_path
    ? process.env.dotenv_config_path
    : ".env.development",
});

const config: HardhatUserConfig = {
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
      mining: {
        auto: false,
        interval: [2000, 5000],
      },
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
    enabled: false,
    currency: "USD",
    maxMethodDiff: 20,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
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
