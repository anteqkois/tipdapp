import { useRouter } from 'next/router';

const Nick = () => {
  const router = useRouter();
  const { nick } = router.query;

  return <div>{nick}</div>;
};
export default Nick;
