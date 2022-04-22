const notFound = (req, res, next) => {
  const err = new Error('404 api endpoint not found');
  err.status = 404;
  next(err);
};

const catchErrors = (handler) => {
  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
    // handler(req, res, next).catch((err) => {
    // next(err);
    // });
  };
};

const createError = (message, status) => {
  const err = new Error(message);
  err.status = status;

  throw err;
};

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
// const createApiError = (message, status) => {
//   throw new ApiError(message, status);
//   // const err = new ApiError(message, status);
//   // throw err;
// };

const handleErrors = (err, req, res, next) => {
  return res.status(err.status || 500).send({ error: err.message });
  next();
};

module.exports = {
  notFound,
  // createError,
  // createApiError,
  catchErrors,
  ApiError,
  handleErrors,
};
