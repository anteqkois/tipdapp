'use client';

import { ErrorMessage } from '@/components/utils';
import { ApiError } from '@anteqkois/server';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: ApiError[];
  reset: () => void;
}) {
  return (
    <div>
      <ErrorMessage>{error[0]?.message ?? 'Something went wrong'}</ErrorMessage>
    </div>
  );
}
