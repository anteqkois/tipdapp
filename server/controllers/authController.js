import NextAuth from 'next-auth/next';
import { ZodError } from 'zod';
import { prisma } from '../lib/db.js';
import {
  createApiError,
  createValidationError,
  createValidationErrors,
  ValidationError,
  ValidationErrors,
} from '../middlewares/error.js';
import { signUpValidation } from '../validation/signUpValidaion.old.js';
// const { PrismaClientKnownRequestError } = Prisma;

import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';

const authorization = async (req, res) => {
  if (req.cookies.authToken) {
    jwt.verify(req.cookies.authToken, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.cookie('authToken', '', {
          maxAge: 0,
          httpOnly: true,
        });
      } else {
        createApiError('You have already authorized.');
      }
    });
  }

  const { signature, walletAddress, nonce } = req.body;
  if (!signature || !walletAddress || !nonce) createApiError('Missing data in request.');

  const signerAddress = ethers.utils.verifyMessage(nonce, signature);

  if (signerAddress !== walletAddress) {
    createApiError('Wrong signature, addresses are not equeal.');
  }
  const user = await prismaClient.user.findFirst({
    where: {
      walletAddress: signerAddress,
    },
  });

  if (user) {
    if (nonce !== user.nonce) {
      createApiError('Wrong signature, nonces are not equeal.');
    }
    //TODO add refresh token
    const accessToken = jwt.sign(
      {
        role: 'authencicated',
        user_metadata: { walletAddress: walletAddress, id: user.id },
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: 3600,
      },
    );
    res.cookie('authToken', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ message: 'You are authorizated', user: { ...user, nonce: '' } });
  } else {
    createApiError('Account not registered. Sign in first.');
  }

  await prismaClient.user.update({
    where: { walletAddress },
    data: { nonce: '' },
  });
};

// const auth = async (req, res) => {
//   req.query.nextauth = req.url.slice(1).replace(/\?.*/, '').split('/');

//   const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth.includes('signin');

//   // Hide Sign-In with Ethereum from default sign page
//   if (isDefaultSigninPage) {
//     providers.pop();
//   }

//   return await NextAuth.default(req, res, {
//     // return await NextAuth(req, res, {
//     providers,
//     session: {
//       strategy: 'jwt',
//       maxAge: 15 * 24 * 30 * 60, // 15 days
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//       // error: '/auth/error',
//     },
//     callbacks: {
//       async jwt({ token, user }) {
//         if (req.query.update) {
//           user = await prisma.user.findFirst({
//             where: {
//               address: token.user.address,
//             },
//             include: {
//               avatar: true,
//               token: {
//                 select: {
//                   address: true,
//                   chainId: true,
//                   name: true,
//                   symbol: true,
//                   txHash: true,
//                 },
//               },
//             },
//           });
//         }

//         if (user) {
//           return { ...token, user };
//         }
//         return token;
//       },
//       async session({ session, token }) {
//         session.user = token.user;
//         if (token) {
//           session.id = token.id;
//         }
//         return session;
//       },
//     },
//   });
// };

const createNonce = (req, res) => {
  res.status(200).json({ nonce: generateNonce() });
  // res.send(generateNonce());
};

const verifyMessage = async (req, res) => {
  const { message, signature } = req.body;
  const siwe = new SiweMessage(message);
  try {
    if (siwe.domain !== new URL(process.env.FRONTEND_URL).host) {
      createValidationError('Signature domain is wrong', 'Wrong domian', 'domain', 'domain');
    }

    //TODO use CSRF token
    // if (siwe.nonce !== (await getCsrfToken({ req }))) {
    //   return null;
    // }

    await siwe.validate(signature);

    const userSesionData = await prisma.user.findFirst({
      where: {
        address: siwe.address,
      },
      include: {
        avatar: true,
        token: {
          select: {
            address: true,
            chainId: true,
            name: true,
            symbol: true,
            txHash: true,
          },
        },
        page: true,
        // Widget: true,
        // Withdraw: true,
      },
    });

    //TODO test if error works
    if (userSesionData) {
      //TODO add refresh token
      const accessToken = jwt.sign(
        {
          role: 'user',
          metadata: { address: userSesionData.address, nick: userSesionData.nick },
        },
        process.env.JWT_TOKEN_SECRET,
        {
          // 1 hour
          expiresIn: 3600,
        },
      );

      res.cookie('authToken', accessToken, {
        secure: true,
        maxAge: 60 * 60 * 1000,
        // httpOnly: true,
      });

      res.status(200).json({ message: 'You are authorizated', user: userSesionData });
    } else {
      createValidationError('Account not registered. Sign in first.', 'No user found', 'user', 'user');
    }
  } catch (err) {
    console.log(err);
    if (err instanceof ValidationError) throw err;
    // createValidationErrors();
    // res.send(false);
  }
};

const logout = async (req, res) => {
  // res.clearCookie('foo');
  if (req.cookies.authToken) {
    res.cookie('authToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).send({ message: 'You are succesfully logout.' });
  } else {
    createApiError('You have not logged in yet.', 422);
  }
};

const validate = async (req, res) => {
  const { email, nick } = req.body;

  try {
    //Validate schema
    signUpValidation.parse(req.body);

    //Validate unique
    const user = await prisma.user.findFirst({
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
      createValidationErrors(errors);
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

export { validate, createNonce, verifyMessage, logout };
// export default { auth, validate, createNonce };
