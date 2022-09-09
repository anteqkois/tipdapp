import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { prismaClient } from '../../services/prismaClient.js';

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
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, user };
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token.user;
        // console.log('session', session);
        // console.log('token', token);
        return session;
      },
    },
  });
};

export { auth };
export default { auth };
