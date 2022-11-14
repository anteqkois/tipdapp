import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { corsConfig } from './config/cors.js';
import { handleErrors, notFound } from './middlewares/error.js';
import { logRequest } from './middlewares/logRequest.js';
import apiRouter from './routes/index.js';
const { config } = dotenv;
config({ path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '.env.development' });

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

server.listen(port, (err) => {
  // if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
