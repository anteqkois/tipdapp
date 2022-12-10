'use client';

import { ErrorMessage } from '@/components/utils';
import { ApiError } from '@anteqkois/server';

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
    <ErrorMessage className="flex-row flex-center">
      Something went wrong...
    </ErrorMessage>
  );
  // return (
  //   <div>
  //     {error[0].type === 'ApiError' ? (
  //       <ErrorMessage className="flex-row flex-center">
  //        Something went wrong...
  //       </ErrorMessage>
  //     ) : (
  //       <ErrorMessage>{error[0].message}</ErrorMessage>
  //     )}
  //   </div>
  // );
}
