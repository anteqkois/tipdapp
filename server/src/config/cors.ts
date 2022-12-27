import { CorsOptions } from 'cors';
import './dotenv';

export const corsConfig: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};
