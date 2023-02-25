import { ApiError } from './ApiError';
import { ValidationError } from './ValidationError';

const isOperationalErrorArray = (
  arr: unknown
): arr is (ApiError | ValidationError)[] => {
  if (
    Array.isArray(arr) &&
    arr[0] !== null &&
    typeof arr[0] === 'object' &&
    'isOperational' in arr[0] &&
    arr[0].isOperational
  )
    return true;
  return false;
};

export * from './ApiError';
export * from './ValidationError';
export { isOperationalErrorArray };
