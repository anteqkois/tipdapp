import { Tipper, User, UserSession } from '@tipdapp/database';
import { JWT_SETTINGS } from '../config/jwt';
import { createValidationError } from '../utils/error';
// import { tipperService } from '@services/tipperService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';
import { tipperService } from '../services/tipperService';
import { userService } from '../services/userService';
import { authApi, AuthApi } from '../validation/authApi';
// import { userService } from '../../../database/src/services/userService';
// import { DecodedUser, UserSession } from '../../../database/src/types';
// import { UserValidation, userValidation } from '../../../database/src/validation/userValidation';

const validateSiweMessage = async (message: Partial<SiweMessage>, signature: string) => {
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
        422,
      );
};

const createAuthToken = (userSessionData: Pick<User, 'roles' | 'address' | 'nick' | 'activeRole'>) => {
  const accessToken = jwt.sign(
    {
      roles: userSessionData.roles,
      activeRole: userSessionData.activeRole,
      address: userSessionData.address,
      nick: userSessionData.nick,
    },
    process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: JWT_SETTINGS.AUTH_EXPIRES,
    },
  );
  return accessToken;
};

const createRefreshToken = (
  userSessionData: Pick<User, 'roles' | 'address' | 'nick' | 'activeRole'>,
  ip: string,
  newSession = false,
) => {
  const refreshToken = jwt.sign(
    {
      role: userSessionData.roles,
      activeRole: userSessionData.activeRole,
      address: userSessionData.address,
      nick: userSessionData.nick,
      ip,
    },
    process.env.JWT_TOKEN_REFRESH!,
    {
      expiresIn: JWT_SETTINGS.REFRESH_EXPIRES,
    },
  );

  //TODO create session in redis
  // newSession
  //   ? userService.createSession({
  //       address: userSessionData.address,
  //       ip,
  //       refreshToken,
  //     })
  //   : userService.addRefreshToken({
  //       address: userSessionData.address,
  //       ip,
  //       refreshToken,
  //     });

  return refreshToken;
};

const createNonce = (req: Request, res: Response) => {
  //TODO! Save nonce in db or in redis cache
  res.status(StatusCodes.OK).json({ nonce: generateNonce() });
};

// const validate = async (req: Request<{}, {}, UserValidation.CreateUser>, res: Response) => {
//   const { email, nick } = req.body;

//   try {
//     //Validate schema
//     userValidation.createParse(req.body);

//     //Validate unique
//     const user = await userService.checkIfExist({
//       OR: [{ email }, { nick }],
//     });

//     if (user) {
//       const errors: ValidationError[] = [];
//       if (user.email === email) {
//         const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
//         errors.push(validationError);
//       }
//       if (user.nick === nick) {
//         const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
//         errors.push(validationError);
//       }
//       throw errors;
//     }
//   } catch (errors) {
//     throwIfOperational(errors, "Something went wrong, data didn't pass validation.");
//   }

//   res.status(StatusCodes.OK).json({ message: 'Validation passed' });
// };

// const signUp = async (req: Request, res: Response) => {
//   const { message, signature, formData } = req.body;

//   // try {
//   //Validate schema

//   //TODO check if nonce are right
//   const siweMessage = await validateSiweMessage(message, signature);

//   //TODO Create endpont on database service to create user
//   const validatedFormData = userValidation.createParse(formData);

//   //Validate unique
//   const userExist = await userService.checkIfExist({
//     OR: [{ address: siweMessage.address }, { email: validatedFormData.email }, { nick: validatedFormData.nick }],
//   });

//   //throw error if exist
//   if (userExist) {
//     const errors: ValidationError[] = [];
//     if (userExist.address === siweMessage.address) {
//       const validationError = new ValidationError(
//         'address',
//         `Already registered.`,
//         `The wallet has already been registered. Go to login page or disconnect wallet from DAPP and then change wallet.`,
//         `address.unique`,
//       );
//       errors.push(validationError);
//     }
//     if (userExist.email === validatedFormData.email) {
//       const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
//       errors.push(validationError);
//     }
//     if (userExist.nick === validatedFormData.nick) {
//       const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
//       errors.push(validationError);
//     }
//     throw errors;
//   }

//   let userSessionData: UserSession;
//   switch (userValidation.type(validatedFormData)) {
//     default:
//       userSessionData = await userService.createStreamer({
//         address: siweMessage.address,
//         ...validatedFormData,
//         streamer: {
//           create: {
//             page: {
//               create: {
//                 role: 'streamer',
//                 affixUrl: validatedFormData.nick,
//               },
//             },
//           },
//         },
//       });
//       break;
//   }

//   //TODO get returned data from database serive and create JWT tokens
//   const authToken = createAuthToken(userSessionData);
//   const refreshToken = createRefreshToken(userSessionData, req.ip, true);

//   res.cookie('authToken', authToken, {
//     secure: true,
//     maxAge: JWT_SETTINGS.AUTH_EXPIRES,
//     httpOnly: true,
//   });

//   res.cookie('refreshToken', refreshToken, {
//     secure: true,
//     maxAge: JWT_SETTINGS.REFRESH_EXPIRES,
//     httpOnly: true,
//   });

//   res.status(StatusCodes.CREATED).json({
//     message: 'The account has been successfully created.',
//     user: userSessionData,
//   });
//   // } catch (error) {
//   //   isOperational(error, "Something went wrong, account didn't created.");
//   // }
// };

const login = async (req: AuthApi.Login.Req, res: AuthApi.Login.Res) => {
  const { body } = authApi.login.parse({ ...req });
  const { message, signature, type } = body;
  const siweMessage = await validateSiweMessage(message, signature);

  if (type === 'user') {
    const userSessionData = await userService.find<UserSession>({
      address: siweMessage.address,
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

      res.status(StatusCodes.OK).json({ message: 'You are authorizated', user: userSessionData });
    }
  } else if (type === 'tipper') {
    let tipper = await tipperService.find<Tipper>({
      address: siweMessage.address,
    });

    if (!tipper) {
      const tipper = await tipperService.create({
        address: siweMessage.address,
      });
    }

    res.status(StatusCodes.OK).json({ message: 'You are authorizated', tipper });
  } else {
    createValidationError('Account not registered. Sign in first.', 'No user found', 'user', 'user');
  }
};

// const refreshUserSession = async (req: Request, res: Response) => {
//   //TODO get data from database service
//   const userSessionData = await userService.find({
//     where: {
//       address: req.user.address,
//     },
//     include: { avatar: true, userToken: true },
//   });

//   if (userSessionData) {
//     res.status(StatusCodes.OK).json({ message: 'New user session data', user: userSessionData });
//   } else {
//     createApiError('Something wrong when you try refetch session data. Please relogin.', StatusCodes.NOT_FOUND);
//   }
// };

// const logout = async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   res.cookie('authToken', '', {
//     maxAge: 0,
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   res.cookie('refreshToken', '', {
//     maxAge: 0,
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   //TODO remove session from redis
//   await userService.removeSession({ ip: req.ip });
//   res.cookie('authStatus', 'unauthenticated');

//   res.status(StatusCodes.OK).send({ message: 'You are succesfully logout.' });
// };

// const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken, authToken } = req.cookies;

//   if (!refreshToken) {
//     if (!authToken) res.cookie('authStatus', 'unauthenticated');
//     createApiError(`Missing refresh token.`, StatusCodes.BAD_REQUEST);
//   }

//   // Clear cookie
//   res.cookie('refreshToken', '', {
//     maxAge: 0,
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   //TODO change this logic, simple check in redis if session exist
//   const user = await userService.findByRefreshToken({ refreshToken });

//   // Somebody want to reuse refresh token, maybe stolen token ?
//   if (!user) {
//     //TODO remove session from redis
//     try {
//       const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET) as DecodedUser;

//       await userService.removeSession({ refreshTokens: { has: refreshToken } });
//       createApiError(`Token has been already used.`, StatusCodes.BAD_REQUEST);
//     } catch (error) {
//       res.cookie('authStatus', 'unauthenticated');
//       createApiError(`Invalid refresh token.`, StatusCodes.BAD_REQUEST);
//     }
//   } else {
//     // Remove token from database
//     //TODO remove used refresh token from redis
//     await userService.removeRefreshToken({
//       ip: req.ip,
//       refreshToken,
//     });

//     try {
//       const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN_REFRESH) as DecodedUser;

//       if (decoded.address !== user.address) createApiError('Invalid refresh token', StatusCodes.BAD_REQUEST);

//       //TODO get user data from decoded JWT token
//       const newAuthToken = createAuthToken(user);
//       const newRefreshToken = createRefreshToken(user, req.ip);

//       res.cookie('authToken', newAuthToken, {
//         secure: true,
//         maxAge: JWT_SETTINGS.AUTH_EXPIRES,
//         httpOnly: true,
//       });

//       res.cookie('refreshToken', newRefreshToken, {
//         secure: true,
//         maxAge: JWT_SETTINGS.REFRESH_EXPIRES,
//         httpOnly: true,
//       });

//       res.status(StatusCodes.OK).json({ message: 'Token was successfully refreshed.' });
//     } catch (error) {
//       res.cookie('authStatus', 'unauthenticated');
//       //TODO remove session in redis
//       userService.removeSession({ ip: req.ip });
//       createApiError('Refresh token is stale', StatusCodes.BAD_REQUEST);
//     }
//   }
// };

export const authController = {
  // validate,
  createNonce,
  login,
  // refreshUserSession,
  // logout,
  // signUp,
  // refreshToken,
};
