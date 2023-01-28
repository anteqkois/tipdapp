export {};

interface IProcessEnv {
  COINMARKETCAP_API_KEY: string;
  REDIS_HOSTNAME: string;
  REDIS_PORT: string;
  REDIS_USER_NAME: string;
  REDIS_PASSWORD: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
