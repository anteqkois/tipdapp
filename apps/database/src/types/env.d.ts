declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_DOMAIN: string;
      FRONTEND_URL: string;
      JWT_TOKEN_SECRET: string;
      JWT_TOKEN_REFRESH: string;
      AMQP_URL: string;
    }
  }
}

export {};
