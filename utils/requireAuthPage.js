import jwt from 'jsonwebtoken';

const redirectToLogin = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/login',
      
    },
  };
};

export function requireAuthPage(GetServerSideProps) {
  return async (ctx) => {
    try {
      const { JWT } = ctx.req.cookies;
      if (!JWT) return redirectToLogin();

      jwt.verify(JWT, process.env.JWT_TOKEN_SECRET, (err, user) => {
        ctx.req.user = user;
        if (err) return redirectToLogin();
      });
    } catch (error) {
      return redirectToLogin();
    }

    return await GetServerSideProps(ctx);
  };
}
