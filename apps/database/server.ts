import './src/config/dotenv';
import './src/config/paths';

import { handleErrors, notFound } from '@middlewares/handleError';
import cookieParser from 'cookie-parser';
import express from 'express';
import { queryParser } from 'express-query-parser';
import { useCors } from './src/config/cors';
import { logRequest } from './src/middlewares/logRequest';
import { startQueueConsumers } from './src/queue';
import { mainRouter } from './src/routes';

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use('*', logRequest);
server.use(useCors);
server.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api', mainRouter);

//handling errors
server.use(notFound);
server.use(handleErrors);

server.listen(port, () => {
  // if (err) throw err;
  startQueueConsumers();
  console.log(`> Ready on http://localhost:${port}`);
});
