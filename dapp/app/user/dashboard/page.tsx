'use client';
import { find } from '@/api/tips';
import TipsDefault from '@/components/Tip/TipsDefault';
import { useQuery } from '@tanstack/react-query';

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['tip'],
    queryFn: () => find({ page: 1, pageSize: 50 }),
    suspense: true,
    retry: false,
  });

  return <TipsDefault tips={data?.tips} />;
};

export default Dashboard;
