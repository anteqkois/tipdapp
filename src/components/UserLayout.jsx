import React from 'react';
import Navbar from './Navbar/index';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-12 mx-auto p-2 lg:p-8 max-w-6xl lg:mt-24">{children}</main>
    </>
  );
};

export default UserLayout;
