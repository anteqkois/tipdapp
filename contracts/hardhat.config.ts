import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

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
  gasReporter: {
    enabled: true,
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
