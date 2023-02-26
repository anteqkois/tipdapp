declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NETWORK: string;
      COINMARKETCAP_API_KEY: string;
      ALCHEMY_API_KEY: string;
      DEPLOYER_WALLET_PRIVATE_KEY: string;
      SIGNER_WALLET_PRIVATE_KEY: string;
      THIRD_WALLET_PRIVATE_KEY: string;
      COINMARKETCAP_API_KEY: string;

      URL_FRONTEND: string;
      AMQP_URL: string;
      REDIS_HOSTNAME: string;
      REDIS_PORT: string;
      REDIS_USER_NAME: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
