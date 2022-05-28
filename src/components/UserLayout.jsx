import React from 'react';
import Navbar from './Navbar/index';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-12 lg:mt-24">{children}</main>
    </>
  );
};

export default UserLayout;
