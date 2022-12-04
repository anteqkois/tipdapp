import './src/config/paths';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { corsConfig } from './src/config/cors';
import { logRequest } from './src/middlewares/logRequest';
import apiRouter from './src/routes';
import { handleErrors, notFound } from '@middlewares/handleError';
const { config } = dotenv;
config({
  path: process.env.dotenv_config_path
    ? process.env.dotenv_config_path
    : '.env',
});

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(cors(corsConfig));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('*', logRequest);

server.use('/api', apiRouter);

//handling errors
server.use(handleErrors);
server.use(notFound);

server.listen(port, () => {
  // if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
// server.listen(port, (err: any) => {
//   // if (err) throw err;
//   console.log(`> Ready on http://localhost:${port}`);
// });
