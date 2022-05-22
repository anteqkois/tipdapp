import React from 'react';
import Navbar from './Navbar/index';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>;
    </>
  );
};

export default UserLayout;
