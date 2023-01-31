// import './src/config/dotenv';
import cors from 'cors';
import express from 'express';
import { handleErrors, notFound } from './src/middlewares/handleError';
import apiRouter from './src/routes';
import { TokenFeed } from './src/services/tokenFeedService';

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const server = express();

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  }),
);

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
