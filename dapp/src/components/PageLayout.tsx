import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <main className="">{children}</main>
    </>
  );
};

export default PageLayout;
