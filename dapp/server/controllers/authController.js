import { Prisma } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { ZodError } from 'zod';
import { prismaClient } from '../../lib/prismaClient.js';
import { userSignUpSchema } from '../../schema/userSignUpSchema.js';
import { createValidationError, ValidationError, ValidationErrors } from '../middlewares/error.js';
const { PrismaClientKnownRequestError } = Prisma;

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
      let userSesionData = null;
      try {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

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

        //check if SignUp
        if (credentials?.formData) {
          const formData = JSON.parse(credentials.formData);

          //Validate schema
          userSignUpSchema.parse(formData);

          //Validate unique
          const user = await prismaClient.user.findFirst({
            where: {
              OR: [{ walletAddress: siwe.address }, { email: formData.email }, { nick: formData.nick }],
            },
            select: {
              walletAddress: true,
              email: true,
              nick: true,
            },
          });

          if (user) {
            const errors = [];
            if (user.walletAddress === siwe.address) {
              const validationError = new ValidationError(
                'walletAddress',
                `Already registered.`,
                `The wallet has already been registered. Go to login or disconnect wallet from DAPP and then change wallet.`,
                `walletAddress.unique`,
              );
              errors.push(validationError);
            }
            if (user.email === formData.email) {
              const validationError = new ValidationError(
                'email',
                `Email used.`,
                `Email already used by someone.`,
                `email.unique`,
              );
              errors.push(validationError);
            }
            if (user.nick === formData.nick) {
              const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
              errors.push(validationError);
            }
            createValidationError(errors);
          }

          userSesionData = await prismaClient.user.create({
            data: {
              walletAddress: siwe.address,
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              nick: formData.nick,
              urlPage: formData.nick,
            },
          });
        } else {
          userSesionData = await prismaClient.user.findFirst({
            where: {
              walletAddress: siwe.address,
            },
          });
        }
      } catch (errors) {
        if (errors instanceof ZodError) {
          throw new Error(JSON.stringify(new ValidationErrors().fromZodErrorArray(errors.issues)));
        } else if (errors instanceof ValidationErrors) {
          throw new Error(JSON.stringify(errors));
        } else {
          console.log(errors);
          throw errors;
        }
      }

      return {
        ...userSesionData,
      };
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
    pages: {
      // error: '/auth/error',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, user };
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token.user;
        if (token) {
          session.id = token.id;
        }
        return session;
      },
    },
  });
};

const validate = async (req, res) => {
  const { email, nick } = req.body;

  try {
    //Validate schema
    userSignUpSchema.parse(req.body);

    //Validate unique
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { nick }],
      },
      select: {
        email: true,
        nick: true,
      },
    });

    if (user) {
      const errors = [];
      if (user.email === email) {
        const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
        errors.push(validationError);
      }
      if (user.nick === nick) {
        const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
        errors.push(validationError);
      }
      createValidationError(errors);
    }
  } catch (errors) {
    if (errors instanceof ZodError) {
      throw new ValidationErrors().fromZodErrorArray(errors.issues);
    } else if (errors instanceof ValidationErrors) {
      throw errors;
    } else {
      console.log(errors);
      // createApiError('Something went wrong, you. Account not created.');
    }
  }

  res.status(200).json({ message: 'Validation passed' });
};

export { auth };
export { validate };
export default { auth, validate };
