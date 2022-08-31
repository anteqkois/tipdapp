import React from 'react';

const Settings = () => {
  return <div>settings</div>;
};

export default Settings;

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
