'use client';

import { ErrorMessage } from '@/shared/ui';
import { ApiError } from '@tipdapp/server';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: ApiError[];
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <ErrorMessage>{error[0].message}</ErrorMessage>
    </div>
  );
}
