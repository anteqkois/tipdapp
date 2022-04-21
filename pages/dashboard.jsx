import { requireAuthPage } from '../lib/requireAuthPage';
import React from 'react';

const dashboard = ({ auth }) => {
  return <div>{auth}</div>;
};

export default dashboard;

export const getServerSideProps = requireAuthPage(async (ctx) => {
  // console.log(ctx.req.user);
  return {
    props: { auth: 'działa' },
  };
});

//API make owne middleware HOC - https://github.com/hunterbecton/next-js-middleware/tree/main/middleware
//Page use requireAuthPage HOC
