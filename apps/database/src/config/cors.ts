import { dotenvConfig } from '@tipdapp/server';
import cors from 'cors';
dotenvConfig();

const corsConfig: cors.CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

export const useCors = cors(corsConfig)