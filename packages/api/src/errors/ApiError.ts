class ApiError extends Error {
  type = 'ApiError';

  status: number;

  message: string;

  isOperational = true;

  constructor(message: string, status?: number) {
    super();
    this.status = status ?? 400;
    this.message = message;
    // Error.captureStackTrace(this, this.constructor);
  }
}

const isApiError = (object: unknown): object is ApiError => {
  if (object !== null && typeof object === 'object' && 'type' in object && object.type === 'ApiError') return true;
  return false;
};

const createApiError = (message: string, status?: number) => {
  throw new ApiError(message, status);
};

export { createApiError, ApiError, isApiError };
