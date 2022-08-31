import React from 'react'

const Creator = () => {
  return (
    <div>creator</div>
  )
}

export default Creator

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
