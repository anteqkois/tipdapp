export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COINMARKETCAP_API_KEY: string;
      FRONTEND_URL: string;
      FRONTEND_DOMAIN: string;
      JWT_TOKEN_SECRET: string;
      JWT_TOKEN_REFRESH: string;
      REDIS_HOSTNAME: string;
      REDIS_USER_NAME: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
    }
  }
}
