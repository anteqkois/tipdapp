import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';
import { requestLogger } from './lib/logger.js';
import { handleErrors, notFound } from './server/middlewares/error.js';
import apiRouter from './server/routes/index.js';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// import { config as configEthers } from './lib/ethersProvider.js';
const baseUrl = '/api/auth/';

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.use((req, res, next) => {
    requestLogger.info('incoming request', { url: req.url, method: req.method, host: req.hostname });
    next();
  });

  server.use('/api', apiRouter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  //handling errors
  server.use(handleErrors);
  server.use(notFound);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    // configEthers();
  });
});