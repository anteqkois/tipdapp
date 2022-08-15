import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <>
      <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-24">{children}</main>
    </>
  );
};

export default PageLayout;
