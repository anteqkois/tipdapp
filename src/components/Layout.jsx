import React from 'react';
import Navbar from './Navbar/index';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>;
    </>
  );
};

export default Layout;
