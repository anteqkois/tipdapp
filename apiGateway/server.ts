import cookieParser from 'cookie-parser';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useCors } from './src/config/cors';
import './src/config/dotenv';
import { handleErrors, notFound } from './src/middlewares/handleError';
import { logRequest } from './src/middlewares/logRequest';
// import apiRouter from './src/routes';

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(useCors);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(logRequest);

server.use(
  // ['/api/token/:token', '/api/token/sand'],
  createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
  }),
);

// server.use('/api', apiRouter);

//handling errors
server.use(notFound);
server.use(handleErrors);

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
