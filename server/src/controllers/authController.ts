import { JWT_SETTINGS } from '@config/jwt';
import {
  createApiError,
  createValidationError,
  createValidationErrors,
  ValidationError,
} from '@middlewares/error';
import { throwIfOperational } from '@middlewares/handleError';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';
import { userService } from '../services/userService';
import { DecodedUser, UserSession } from '../types';
import { UserValidation, userValidation } from '../validation/userValidation';

const validateSiweMessage = async (
  message: Partial<SiweMessage>,
  signature: string
) => {
  const siwe = new SiweMessage(message || {});

  const { data, success, error } = await siwe.verify({
    signature,
    domain: process.env.DOMAIN,
  });

  return success
    ? data
    : createValidationError(
        error?.type ?? "Siwe Message didn't pass validation.",
        'Siwe Validation',
        'siwe',
        'siwe.invalid',
        422
      );
};

const createAuthToken = (
  userSessionData: Pick<User, 'roles' | 'address' | 'nick' | 'activeRole'>
) => {
  const accessToken = jwt.sign(
    {
      roles: userSessionData.roles,
      activeRole: userSessionData.activeRole,
      address: userSessionData.address,
      nick: userSessionData.nick,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: JWT_SETTINGS.AUTH_EXPIRES,
    }
  );
  return accessToken;
};

const createRefreshToken = (
  userSessionData: Pick<User, 'roles' | 'address' | 'nick' | 'activeRole'>,
  ip: string,
  newSession = false
) => {
  const refreshToken = jwt.sign(
    {
      role: userSessionData.roles,
      activeRole: userSessionData.activeRole,
      address: userSessionData.address,
      nick: userSessionData.nick,
      ip,
    },
    process.env.JWT_TOKEN_REFRESH,
    {
      expiresIn: JWT_SETTINGS.REFRESH_EXPIRES,
    }
  );

  newSession
    ? userService.createSession({
        address: userSessionData.address,
        ip,
        refreshToken,
      })
    : userService.addRefreshToken({
        address: userSessionData.address,
        ip,
        refreshToken,
      });

  return refreshToken;
};

const createNonce = (req: Request, res: Response) => {
  //TODO! Save nonce in db or in redis cache
  res.status(StatusCodes.OK).json({ nonce: generateNonce() });
};

const validate = async (
  req: Request<{}, {}, UserValidation.CreateUser>,
  res: Response
) => {
  const { email, nick } = req.body;

  try {
    //Validate schema
    userValidation.createParse(req.body);

    //Validate unique
    const user = await userService.checkIfExist({
      OR: [{ email }, { nick }],
    });

    if (user) {
      const errors: ValidationError[] = [];
      if (user.email === email) {
        const validationError = new ValidationError(
          'email',
          `Email used.`,
          `Email already used by someone.`,
          `email.unique`
        );
        errors.push(validationError);
      }
      if (user.nick === nick) {
        const validationError = new ValidationError(
          'nick',
          `Nick used.`,
          `Nick already used by someone.`,
          `nick.unique`
        );
        errors.push(validationError);
      }
      createValidationErrors(errors, StatusCodes.UNPROCESSABLE_ENTITY);
    }
  } catch (errors) {
    throwIfOperational(
      errors,
      "Something went wrong, data didn't pass validation."
    );
  }

  res.status(StatusCodes.OK).json({ message: 'Validation passed' });
};

const signUp = async (req: Request, res: Response) => {
  const { message, signature, formData } = req.body;

  // try {
  //Validate schema
  const validatedFormData = userValidation.createParse(formData);

  const siweMessage = await validateSiweMessage(message, signature);

  //Validate unique
  const userExist = await userService.checkIfExist({
    OR: [
      { address: siweMessage.address },
      { email: validatedFormData.email },
      { nick: validatedFormData.nick },
    ],
  });

  //throw error if exist
  if (userExist) {
    const errors: ValidationError[] = [];
    if (userExist.address === siweMessage.address) {
      const validationError = new ValidationError(
        'address',
        `Already registered.`,
        `The wallet has already been registered. Go to login page or disconnect wallet from DAPP and then change wallet.`,
        `address.unique`
      );
      errors.push(validationError);
    }
    if (userExist.email === validatedFormData.email) {
      const validationError = new ValidationError(
        'email',
        `Email used.`,
        `Email already used by someone.`,
        `email.unique`
      );
      errors.push(validationError);
    }
    if (userExist.nick === validatedFormData.nick) {
      const validationError = new ValidationError(
        'nick',
        `Nick used.`,
        `Nick already used by someone.`,
        `nick.unique`
      );
      errors.push(validationError);
    }
    createValidationErrors(errors);
  }

  let userSessionData: UserSession;
  switch (userValidation.type(validatedFormData)) {
    case 'streamer':
      userSessionData = await userService.createStreamer({
        address: siweMessage.address,
        ...validatedFormData,
        streamer: {
          create: {
            page: {
              create: {
                role: 'streamer',
                affixUrl: validatedFormData.nick,
              },
            },
          },
        },
      });
      userSessionData;
      break;
    default:
      userSessionData = await userService.createTipper({
        address: siweMessage.address,
        ...validatedFormData,
      });
      break;
  }
  const authToken = createAuthToken(userSessionData);
  const refreshToken = createRefreshToken(userSessionData, req.ip, true);

  res.cookie('authToken', authToken, {
    secure: true,
    maxAge: JWT_SETTINGS.AUTH_EXPIRES,
    httpOnly: true,
  });

  res.cookie('refreshToken', refreshToken, {
    secure: true,
    maxAge: JWT_SETTINGS.REFRESH_EXPIRES,
    httpOnly: true,
  });

  res.status(StatusCodes.CREATED).json({
    message: 'The account has been successfully created.',
    user: userSessionData,
  });
  // } catch (error) {
  //   isOperational(error, "Something went wrong, account didn't created.");
  // }
};

const verifyMessageAndLogin = async (req: Request, res: Response) => {
  const { message, signature } = req.body;
  // try {
  const siweMessage = await validateSiweMessage(message, signature);

  const userSessionData = await userService.find({
    where: {
      address: siweMessage.address,
    },
  });

  if (userSessionData) {
    const authToken = createAuthToken(userSessionData);
    const refreshToken = createRefreshToken(userSessionData, req.ip, true);

    res.cookie('authToken', authToken, {
      secure: true,
      maxAge: JWT_SETTINGS.AUTH_EXPIRES,
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      maxAge: JWT_SETTINGS.REFRESH_EXPIRES,
      httpOnly: true,
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'You are authorizated', user: userSessionData });
  } else {
    createValidationError(
      'Account not registered. Sign in first.',
      'No user found',
      'user',
      'user'
    );
  }
  // } catch (err) {
  //   isOperational(err, "Something went wrong, you didn't login.");
  // }
};

const refreshUserSession = async (req: Request, res: Response) => {
  const userSessionData = await userService.find({
    where: {
      address: req.user.address,
    },
    include: { avatar: true, userToken: true },
  });

  if (userSessionData) {
    res
      .status(StatusCodes.OK)
      .json({ message: 'New user session data', user: userSessionData });
  } else {
    createApiError(
      'Something wrong when you try refetch session data. Please relogin.',
      StatusCodes.NOT_FOUND
    );
  }
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  res.cookie('authToken', '', {
    maxAge: 0,
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie('refreshToken', '', {
    maxAge: 0,
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  await userService.removeSession({ ip: req.ip });
  res.cookie('authStatus', 'unauthenticated');

  res.status(StatusCodes.OK).send({ message: 'You are succesfully logout.' });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken, authToken } = req.cookies;

  if (!refreshToken) {
    if (!authToken) res.cookie('authStatus', 'unauthenticated');
    createApiError(`Missing refresh token.`, StatusCodes.BAD_REQUEST);
  }

  // Clear cookie
  res.cookie('refreshToken', '', {
    maxAge: 0,
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  const user = await userService.findByRefreshToken({ refreshToken });

  // Somebody want to reuse refresh token, maybe stolen token ?
  if (!user) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_TOKEN_SECRET
      ) as DecodedUser;

      await userService.removeSession({ refreshTokens: { has: refreshToken } });
      createApiError(`Token has been already used.`, StatusCodes.BAD_REQUEST);
    } catch (error) {
      res.cookie('authStatus', 'unauthenticated');
      createApiError(`Invalid refresh token.`, StatusCodes.BAD_REQUEST);
    }
  } else {
    // Remove token from database
    await userService.removeRefreshToken({
      ip: req.ip,
      refreshToken,
    });

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_TOKEN_REFRESH
      ) as DecodedUser;

      if (decoded.address !== user.address)
        createApiError('Invalid refresh token', StatusCodes.BAD_REQUEST);

      const newAuthToken = createAuthToken(user);
      const newRefreshToken = createRefreshToken(user, req.ip);

      res.cookie('authToken', newAuthToken, {
        secure: true,
        maxAge: JWT_SETTINGS.AUTH_EXPIRES,
        httpOnly: true,
      });

      res.cookie('refreshToken', newRefreshToken, {
        secure: true,
        maxAge: JWT_SETTINGS.REFRESH_EXPIRES,
        httpOnly: true,
      });

      res
        .status(StatusCodes.OK)
        .json({ message: 'Token was successfully refreshed.' });
    } catch (error) {
      res.cookie('authStatus', 'unauthenticated');
      createApiError('Refresh token is stale', StatusCodes.BAD_REQUEST);
    }
  }
};

export {
  validate,
  createNonce,
  verifyMessageAndLogin,
  refreshUserSession,
  logout,
  signUp,
  refreshToken,
};
