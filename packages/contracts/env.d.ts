export {};

interface IProcessEnv {
  NETWORK: string;
  COINMARKETCAP_API_KEY: string;
  ALCHEMY_API_KEY: string;
  DEPLOYER_WALLET_PRIVATE_KEY: string;
  SIGNER_WALLET_PRIVATE_KEY: string;
  THIRD_WALLET_PRIVATE_KEY: string;
  ETHERNAL_EMAIL: string;
  ETHERNAL_PASSWORD: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
