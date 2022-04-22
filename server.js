const express = require('express');
const next = require('next');
const apiRouter = require('./server/routes/index');
const { notFound, handleErrors } = require('./server/middlewares/error');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  app.use(bodyParser.json());
  app.use(cookieParser());

  server.all('/api', apiRouter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  //handling errors
  app.use(notFound);
  app.use(handleErrors);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
