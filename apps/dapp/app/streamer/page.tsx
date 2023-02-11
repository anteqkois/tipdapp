'use client';

import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();
  router.push('/streamer/dashboard');
};

export default Main;
