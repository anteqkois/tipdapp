'use client';

import { Button, ErrorMessage } from '@/components/utils';
import { ApiError } from '@tipdapp/server';
import Link from 'next/link';

type Props = {
  error: ApiError[];
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  // const router = useRouter();

  // if (error[0].message === 'You are not authorized.') {
  // router?.push('/login');
  // return <PageSpinner />;
  // }

  return (
    <div>
      {error[0].message === 'You are not authorized.' ? (
        <ErrorMessage className="flex-center flex-row">
          Session expired.
          <Button variant="danger">
            <Link href="/login">Login again</Link>
          </Button>
        </ErrorMessage>
      ) : (
        <ErrorMessage>{error[0].message}</ErrorMessage>
      )}
    </div>
  );
}
