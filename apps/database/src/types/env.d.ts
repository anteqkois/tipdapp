declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_DOMAIN: string;
      FRONTEND_URL: string;
      AMQP_URL: string;
    }
  }
}

export {};
