import jwtVerification from './jwtVerification';

export function requireAuthApi(handler) {
  return async (req, res) => {
    const { JWT } = req.cookies;
  };
  // return async (ctx) => {
  //   try {
  //     const { JWT } = ctx.req.cookies;
  //     if (!JWT) {
  //       return {
  //         redirect: {
  //           permanent: false,
  //           destination: '/login',
  //         },
  //       };
  //     }

  //     const user = jwtVerification(JWT);

  //     if (user) {
  //       ctx.req.user = user;
  //     } else {
  //       return {
  //         redirect: {
  //           permanent: false,
  //           destination: '/login',
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: '/login',
  //       },
  //     };
  //   }

  //   return await GetServerSideProps(ctx);
  // };
}
