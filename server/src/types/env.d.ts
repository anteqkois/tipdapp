export {};

interface IProcessEnv {
  FRONTEND_DOMAIN: string;
  FRONTEND_URL: string;
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_REFRESH: string;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends IProcessEnv {}
  }
}
