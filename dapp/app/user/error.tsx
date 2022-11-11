'use client';

import { Button, ErrorMessage } from '@/components/utils';
import { ApiError } from '@/types/index';
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
        <Button option='danger'>
          <Link href="/login">Go to login</Link>
        </Button>
      ) : (
        <ErrorMessage>{error[0].message}</ErrorMessage>
      )}
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
