import { ZodError } from 'zod';
import { prisma } from '../config/db.js';
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
//     //TODO add refresh token

const validateSiweMessage = async (message, signature) => {
  //TODO! SAVE NONCE IN COOKIES ONLYSERVER
  const siwe = new SiweMessage(message || {});

  // if (siwe.domain !== new URL(process.env.FRONTEND_URL).host) {
  //   createValidationError('Signature domain is wrong', 'Wrong domian', 'domain', 'domain');
  // }

  const { data, success } = await siwe.verify({ signature, domain: process.env.FRONTEND_URL });

  return success
    ? data
    : createValidationError("Siwe Message didn't pass validation.", 'Siwe Validation', 'siwe', 'siwe.invalid');
};

const createAuthToken = (userSessionData) => {
  const accessToken = jwt.sign(
    {
      role: 'user',
      metadata: { address: userSessionData.address, nick: userSessionData.nick },
    },
    process.env.JWT_TOKEN_SECRET,
    {
      // 1 hour
      expiresIn: 3600,
    },
  );
  return accessToken;
};

const signUp = async (req, res) => {
  const { message, signature, formData } = req.body;

  try {
    const siweMessage = await validateSiweMessage(message, signature);

    //Validate schema
    signUpValidation.parse(formData);

    //Validate unique
    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ address: siweMessage.address }, { email: formData.email }, { nick: formData.nick }],
      },
      select: {
        address: true,
        email: true,
        nick: true,
      },
    });

    if (userExist) {
      const errors = [];
      if (userExist.address === siweMessage.address) {
        const validationError = new ValidationError(
          'address',
          `Already registered.`,
          `The wallet has already been registered. Go to login page or disconnect wallet from DAPP and then change wallet.`,
          `address.unique`,
        );
        errors.push(validationError);
      }
      if (userExist.email === formData.email) {
        const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
        errors.push(validationError);
      }
      if (userExist.nick === formData.nick) {
        const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
        errors.push(validationError);
      }
      createValidationErrors(errors);
    }

    const userSessionData = await prisma.user.create({
      data: {
        address: siweMessage.address,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        nick: formData.nick,
        page: {
          create: {
            url: formData.nick,
          },
        },
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
      },
    });

    const authToken = createAuthToken(userSessionData);

    res.cookie('authToken', authToken, {
      secure: true,
      // 1h
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({ message: 'The account has been successfully created.', user: userSessionData });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationErrors().fromZodErrorArray(error.issues);
    } else if (error instanceof ValidationErrors) {
      throw error;
    } else {
      console.log(error);
      throw error;
    }
  }
};

const createNonce = (req, res) => {
  //TODO! Save nonce in db or in redis cache
  res.status(200).json({ nonce: generateNonce() });
};

const verifyMessage = async (req, res) => {
  const { message, signature } = req.body;
  // const siwe = new SiweMessage(message);
  try {
    // if (siwe.domain !== new URL(process.env.FRONTEND_URL).host) {
    //   createValidationError('Signature domain is wrong', 'Wrong domian', 'domain', 'domain');
    // }

    // await siwe.validate(signature);
    const siweMessage = await validateSiweMessage(message, signature);

    const userSessionData = await prisma.user.findFirst({
      where: {
        address: siweMessage.address,
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
    if (userSessionData) {
      //TODO add refresh token
      const authToken = createAuthToken(userSessionData);

      res.cookie('authToken', authToken, {
        secure: true,
        // 1h
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json({ message: 'You are authorizated', user: userSessionData });
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
  res.cookie('authToken', '', {
    maxAge: 0,
    expries: Date.now(),
    httpOnly: true,
  });
  res.cookie('authStatus', '', {
    // 1h
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).send({ message: 'You are succesfully logout.' });
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
      createApiError('Something went wrong, you. Account not created.');
    }
  }

  res.status(200).json({ message: 'Validation passed' });
};

export { validate, createNonce, verifyMessage, logout, signUp };
// export default { auth, validate, createNonce };
