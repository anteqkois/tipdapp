import { Network } from './src/types';

export {};

interface IProcessEnv {
  NETWORK: Network;
  COINMARKETCAP_API_KEY: string;
  ALCHEMY_API_KEY: string;
  DEPLOYER_WALLET_PRIVATE_KEY: string;
  SIGNER_WALLET_PRIVATE_KEY: string;
  THIRD_WALLET_PRIVATE_KEY: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
