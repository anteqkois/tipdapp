import { Network } from './src/types/index.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NETWORK: Network;
      COINMARKETCAP_API_KEY: string;
      ALCHEMY_API_KEY: string;
      DEPLOYER_WALLET_PRIVATE_KEY: string;
      SIGNER_WALLET_PRIVATE_KEY: string;
      THIRD_WALLET_PRIVATE_KEY: string;
      AMQP_URL: string;
    }
  }
}

export {};
