import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';
import { handleErrors, notFound } from './server/middlewares/error.js';
import apiRouter from './server/routes/index.js';
import './services/ethersProvider.js';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    // server.use(bodyParser.json());
    // server.use(cookieParser());

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    // server.use('/api', apiRouter);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    //handling errors
    server.use(handleErrors);
    server.use(notFound);

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
