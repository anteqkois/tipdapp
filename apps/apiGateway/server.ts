import { useCors } from './src/config/cors';
import './src/config/dotenv';
import { services } from './src/config/proxy';

import { handleErrors, logRequest, notFound } from '@tipdapp/server';
import cookieParser from 'cookie-parser';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { router } from './src/routes';

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(useCors);
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(logRequest);

for (const [key, value] of Object.entries(services)) {
  console.log(`> Create proxy for: ${key} microservice`);
  server.use(
    value.routes,
    createProxyMiddleware({
      target: value.url,
      changeOrigin: true,
      timeout: 30 * 1000,
    }),
  );
}

server.use(express.json());
server.use('/api', router);

//handling errors
server.use(notFound);
server.use(handleErrors);

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
