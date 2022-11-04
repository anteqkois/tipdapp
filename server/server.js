import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
// import next from 'next';
import { handleErrors, notFound } from './middlewares/error.js';
import apiRouter from './routes/index.js';
// require('dotenv').config({ path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '.env.development' });
import dotenv from 'dotenv';
const { config } = dotenv;
config({ path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '.env.development' });

const port = process.env.PORT || 3001;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// import { config as configEthers } from './lib/ethersProvider.js';
// const baseUrl = '/api/auth/';
const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  
};
// app.prepare().then(() => {
const server = express();

server.use(cors(corsOption));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/test', (req, res)=>{
  res.send('working 4!')
});
server.use('/api', apiRouter);

//handling errors
server.use(handleErrors);
server.use(notFound);

server.listen(port, (err) => {
  // if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
  // configEthers();
});
// });

// process.on('uncaughtException', () => {
//   process.kill(process.pid);
//   // process.kill();
//   // process.exit(1);
// });
