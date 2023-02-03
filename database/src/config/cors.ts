import cors from 'cors';
// import { CorsOptions } from 'cors';
import './dotenv';

const corsConfig: cors.CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

export const useCors = cors(corsConfig)