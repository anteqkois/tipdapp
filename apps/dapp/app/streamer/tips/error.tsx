'use client';

import { ErrorMessage } from '@/shared/ui';
import { ApiError } from '@tipdapp/database';
import { useEffect } from 'react';

export default function Error({ error }: { error: ApiError[] }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <ErrorMessage>{error[0].message}</ErrorMessage>
    </div>
  );
}
