import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

const providers = [
  CredentialsProvider.default({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
    },
    async authorize(credentials, req) {
      try {
        console.log(credentials);

        const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

        const user = await prismaClient.user.findFirst({
          where: {
            walletAddress: siwe.address,
          },
        });

        const nextAuthUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
        if (!nextAuthUrl) {
          return null;
        }

        const nextAuthHost = new URL(nextAuthUrl).host;
        if (siwe.domain !== nextAuthHost) {
          return null;
        }

        if (siwe.nonce !== (await getCsrfToken({ req }))) {
          return null;
        }

        await siwe.validate(credentials?.signature || '');
        return {
          ...user,
        };
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  }),
];

const auth = async (req, res) => {
  req.query.nextauth = req.url.slice(1).replace(/\?.*/, '').split('/');

  const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth.default(req, res, {
    providers,
    session: {
      strategy: 'jwt',
      maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, user };
        }
        return token;
      },
      // async redirect({ url, baseUrl }) {
      //   // Allows relative callback URLs
      //   // if (url.startsWith('/')) return `${baseUrl}${url}`;
      //   // Allows callback URLs on the same origin
      //   // else if (new URL(url).origin === baseUrl) return url;
      //   console.log('url', url);
      //   console.log('baseUrl', baseUrl);
      //   console.log('split', url.replace(baseUrl, ''));

      //   // console.log('baseUrl', baseUrl);

      //   if (url.replace(baseUrl, '') === '/login') return `${baseUrl}/dashboard`;
      //   return url;
      //   // return baseUrl;
      // },
      async session({ session, token }) {
        session.user = token.user;
        if (token) {
          session.id = token.id;
        }
        // console.log('session', session);
        // console.log('token', token);
        return session;
      },
    },
  });
};

const validate = async (req, res) => {
  // const { walletAddress, email, firstName, lastName, nick } = req.body;
  // if (!walletAddress || !email || !firstName || !lastName || !nick) createApiError('Missing data to create accout.');
  // const user = await prismaClient.user.findFirst({
  //   where: {
  //     walletAddress,
  //   },
  // });
  // if (!user) {
  //   const nonce = randomUUID();
  //   try {
  //     const newUser = await prismaClient.user.create({
  //       data: { walletAddress, email, firstName, lastName, nonce, nick, urlTip: nick },
  //     });
  //     res.status(200).json({ nonce: nonce, user: newUser });
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         const errors = [];
  //         const validationError = new ValidationError(
  //           error.meta.target[0],
  //           `${capitalizeFirstLetter(error.meta.target[0])} used.`,
  //           `${capitalizeFirstLetter(error.meta.target[0])} already used by someone.`,
  //           `${error.meta.target}.unique`,
  //         );
  //         errors.push(validationError);
  //         createValidationError(errors, 403);
  //       }
  //     } else {
  //     }
  //     createApiError('Something went wrong, you. Account not created.');
  //   }
  // } else {
  //   // next(createApiError('Account is already register. Login to acccount.', 305));
  //   createApiError('Account is already register.', 403);
  // }
};

export { auth };
export { validate };
export default { auth, validate };
