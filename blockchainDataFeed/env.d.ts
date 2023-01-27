export {};

interface IProcessEnv {
  COINMARKETCAP_API_KEY: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
