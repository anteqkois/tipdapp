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
    this.userMessage = message;
    this.isOperational = true;

    // Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError {
  field;
  constructor(field, title, userMessage, code) {
    // this.placement = placement;
    // this.location = location;
    this.field = field;
    this.title = title;
    this.userMessage = userMessage;
    this.code = code;
  }
}

class ValidationErrors extends Error {
  constructor(errors, status, detail) {
    super();
    this.name = 'ValidationErrors';
    // pass array of ValidationError
    this.errors = errors;
    this.status = status;
    this.detail = detail;
    this.isOperational = true;
  }
}

const createValidationError = (errors, status, detail) => {
  throw new ValidationErrors(errors, status, detail);
};
const createApiError = (message, status) => {
  throw new ApiError(message, status);
};

const handleErrors = (err, req, res, next) => {
  console.table(err);

  if (err instanceof ApiError) {
    return res.status(err.status || 500).json(err);
  }
  if (err instanceof ValidationErrors) {
    return res.status(err.status || 500).json({ errors: err.errors });
  }
  return res.status(err.status || 500).json(err?.message);
  // next();
};

module.exports = {
  notFound,
  createApiError,
  createValidationError,
  catchErrors,
  catchAsyncErrors,
  ApiError,
  ValidationError,
  handleErrors,
};
