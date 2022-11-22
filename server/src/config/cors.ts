import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};
