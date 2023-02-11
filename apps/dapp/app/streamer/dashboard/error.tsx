'use client';

import { ErrorMessage } from '@/shared/ui';
import { ApiError } from '@tipdapp/database';

export default function Error({
  error,
}: {
  error: ApiError[];
}) {
  return (
    <div>
      <ErrorMessage>{error[0]?.message ?? 'Something went wrong'}</ErrorMessage>
    </div>
  );
}
