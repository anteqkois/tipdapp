'use client';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter()
  router.push('/user/dashboard');
  
};

export default Main;
