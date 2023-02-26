import { dotenvConfig } from '@tipdapp/server';
import cors from 'cors';
dotenvConfig();

const corsConfig: cors.CorsOptions = {
  origin: process.env.URL_FRONTEND,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

export const useCors = cors(corsConfig);
