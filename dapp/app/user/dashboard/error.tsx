'use client';

import { ErrorMessage } from '@/components/utils';
import { ApiError } from '@/types/index';
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
