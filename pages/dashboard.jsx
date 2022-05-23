import { requireAuthPage } from '../utils/requireAuthPage';
import React from 'react';

const dashboard = ({ user }) => {
  // console.log(user);
  return <div>{}</div>;
};

export default dashboard;

// export const getServerSideProps = requireAuthPage(async (ctx) => {
//   return {
//     props: { user: ctx.req.user },
//   };
// });
