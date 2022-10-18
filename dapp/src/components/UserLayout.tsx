import { ReactNode } from 'react';
import Navigation from './Navigation/index';

type Props = {
  children: ReactNode;
};

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32">
        {children}
      </main>
    </>
  );
};

export default UserLayout;
