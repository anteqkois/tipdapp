export {};

interface IProcessEnv {
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_REFRESH: string;
  // AMQP_URL: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
