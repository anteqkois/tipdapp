'use client';

import { ErrorPage } from '@/shared/ui';
import { ApiError, ValidationError } from '@tipdapp/api';

type Props = {
  error: unknown[];
};
export const isOperationalErrorArray = (
  arr: unknown[]
): arr is (ApiError | ValidationError)[] => {
  if (
    arr[0] !== null &&
    typeof arr[0] === 'object' &&
    'isOperational' in arr[0] &&
    arr[0].isOperational === true
  )
    return true;
  return false;
};

export default function Error({ error }: Props) {
  return isOperationalErrorArray(error) ? (
    <ErrorPage className="flex-center flex-row">{error[0].message}</ErrorPage>
  ) : (
    <ErrorPage className="flex-center flex-row">
      Something went wrong...
    </ErrorPage>
  );
}
