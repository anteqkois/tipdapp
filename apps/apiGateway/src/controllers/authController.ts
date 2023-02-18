import { createApiError, createValidationError } from '@tipdapp/api';
import { Tipper, User, UserSession } from '@tipdapp/database';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';
import { JWT_SETTINGS } from '../config/jwt';
import { CONSTANTS, redis } from '../config/redis';
import { tipperService } from '../services/tipperService';
import { userService } from '../services/userService';
import { DecodedUser } from '../types';
import { authApi, AuthApi } from '../validation/authApi';

const validateSiweMessage = async (message: Partial<SiweMessage>, signature: string) => {
  const siwe = new SiweMessage(message || {});

  const { data, success, error } = await siwe.verify({
    signature,
    domain: process.env.FRONTEND_DOMAIN,
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
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: JWT_SETTINGS.AUTH_EXPIRES,
    },
  );

  //TODO Save authToken to redis to have ability to remove session whenever it will be necessary for example from reason of hacking

  return accessToken;
};

const createRefreshToken = async (userSessionData: Pick<User, 'roles' | 'address' | 'nick' | 'activeRole'>, ip: string) => {
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
    },
  );

  await redis.hSet(`session:${ip}`, { address: userSessionData.address, ip: ip, refreshToken: refreshToken });
  await redis.expire(`session:${ip}`, JWT_SETTINGS.REFRESH_EXPIRES / 1000);

  return refreshToken;
};

const deleteSession = async (ip: string) => redis.hDel(`session:${ip}`, ['address', 'ip', 'refreshToken']);

const createNonce = async (req: Request, res: Response) => {
  const nonce = generateNonce();
  await redis.setEx(`nonce:${req.ip}`, CONSTANTS.NONCE_EXPIRE_S, nonce);
  res.status(StatusCodes.OK).json({ nonce });
};

const signUp = async (req: AuthApi.SignUp.Req, res: AuthApi.SignUp.Res) => {
  const { message, signature, formData } = req.body;
  const parsedRequest = authApi.signUp.parse({ ...req });

  const siweMessage = await validateSiweMessage(message, signature);

  const redisNonce = await redis.get(`nonce:${req.ip}`);
  if (redisNonce !== siweMessage.nonce) createApiError('Invalid message nonce.', HttpStatusCode.UnprocessableEntity);

  const { user } = await userService.create({ ...formData, address: siweMessage.address });

  const authToken = createAuthToken(user);
  const refreshToken = await createRefreshToken(user, req.ip);

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
    user,
  });
};

const login = async (req: AuthApi.Login.Req, res: AuthApi.Login.Res) => {
  const { body } = authApi.login.parse({ ...req });
  const { message, signature, type } = body;

  const siweMessage = await validateSiweMessage(message, signature);

  const redisNonce = await redis.get(`nonce:${req.ip}`);
  if (redisNonce !== siweMessage.nonce) createApiError('Invalid message nonce.', HttpStatusCode.UnprocessableEntity);

  if (type === 'user') {
    const { user } = await userService.find<{ user: UserSession }>({
      address: siweMessage.address,
      include: ['streamer', 'avatar', 'userToken'],
    });

    if (user) {
      const authToken = createAuthToken(user);
      const refreshToken = await createRefreshToken(user, req.ip);

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

      res.status(StatusCodes.OK).json({ message: 'You are authorizated', user });
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

const refreshUserSession = async (req: Request, res: Response) => {
  const { user } = await userService.find<{ user: UserSession }>({
    address: req.user.address,
    include: ['streamer', 'avatar', 'userToken'],
  });

  if (user) {
    res.status(StatusCodes.OK).json({ user });
  } else {
    createApiError('Something wrong when you try refetch session data. Please relogin.', StatusCodes.NOT_FOUND);
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

  await deleteSession(req.ip);
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

  const session = await redis.hGetAll(`session:${req.ip}`);

  // Somebody want to reuse refresh token, maybe stolen token ?
  if (session.refreshToken !== refreshToken) {
    try {
      await deleteSession(req.ip);
      createApiError(`Token has been already used.`, StatusCodes.BAD_REQUEST);
    } catch (error) {
      res.cookie('authStatus', 'unauthenticated');
      createApiError(`Invalid refresh token.`, StatusCodes.BAD_REQUEST);
    }
  } else {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN_REFRESH) as DecodedUser;

      if (decoded.address !== session.address) createApiError('Invalid refresh token', StatusCodes.BAD_REQUEST);

      const newAuthToken = createAuthToken(decoded);
      const newRefreshToken = await createRefreshToken(decoded, req.ip);

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

      res.status(StatusCodes.OK).json({ message: 'Token was successfully refreshed.' });
    } catch (error) {
      res.cookie('authStatus', 'unauthenticated');
      await deleteSession(req.ip);
      createApiError('Refresh token is stale', StatusCodes.BAD_REQUEST);
    }
  }
};

export const authController = {
  createNonce,
  login,
  refreshUserSession,
  logout,
  signUp,
  refreshToken,
};
