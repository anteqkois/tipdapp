'use client';
import { TipsList } from '@/modules/Tip/containers/TipsList';
import { useTips } from '@/modules/Tip/hooks/useTips';

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Dashboard = () => {
  const { data } = useTips({ page: 1, pageSize: 8 });

  return (
    <TipsList
      tips={data?.tips!}
      tipView="Minimalist"
    />
  );
};

export default Dashboard;
