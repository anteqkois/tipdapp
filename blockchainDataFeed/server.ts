// import './src/config/dotenv';
import express from 'express';
import { handleErrors, notFound } from './src/middlewares/handleError';
import apiRouter from './src/routes';
import { TokenFeed } from './src/services/tokenFeedService';

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(cookieParser());
new TokenFeed().start();

server.use('/api', apiRouter);

//handling errors
server.use(notFound);
server.use(handleErrors);

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
