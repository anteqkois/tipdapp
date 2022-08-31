import React from 'react'

const Token = () => {
  return (
    <div>Token</div>
  )
}

export default Token

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
