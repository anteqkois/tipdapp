import { dotenvConfig, handleErrors, notFound } from '@tipdapp/server';
import cors from 'cors';
import express from 'express';
import { startToListen } from './src/eventListeners';
import { mainRouter } from './src/routes';
import { TokenFeedService } from './src/services/tokenFeedService';

dotenvConfig();

const port = process.env.PORT || 3003;

const server = express();

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(cookieParser());
new TokenFeedService().start();

server.use('/api', mainRouter);

// handling errors
server.use(notFound);
server.use(handleErrors);

server.listen(port, () => {
  startToListen();
  console.log(`> Ready on http://localhost:${port}`);
});
