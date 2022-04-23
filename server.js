const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('./server/routes/index');
const { notFound, handleErrors } = require('./server/middlewares/error');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cookieParser());

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
  });
});
