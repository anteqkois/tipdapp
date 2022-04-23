const notFound = (req, res, next) => {
  const err = new Error('404 api endpoint not found');
  err.status = 404;
  next(err);
};

const catchAsyncErrors = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const catchErrors = (handler) => {
  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
const createApiError = (message, status) => {
  throw new ApiError(message, status);
};

const handleErrors = (err, req, res, next) => {
  // return res.status(err.status || 500).send({ error: err.message });
  // console.log(err);
  return res.status(err.status || 500).send(err.message);
  // next();
};

module.exports = {
  notFound,
  createApiError,
  catchErrors,
  catchAsyncErrors,
  ApiError,
  handleErrors,
};
