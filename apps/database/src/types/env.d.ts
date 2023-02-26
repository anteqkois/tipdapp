declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_DOMAIN: string;
      URL_FRONTEND: string;
      AMQP_URL: string;
    }
  }
}

export { };

