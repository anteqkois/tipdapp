import { Prisma } from '@prisma/client';
import { userService } from '@services/userService';
import { ValidationError } from '@tipdapp/api';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userApi, UserApi } from '../validation/userApi';

const findByNick = async (
  req: UserApi.FindByNick.Req,
  res: UserApi.FindByNick.Res
) => {
  const { params, query } = userApi.findByNick.parse({ ...req });

  const user = await userService.find({
    where: { nick: params.nick },
    include: {
      avatar: true,
      streamer: query.include?.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: query.include?.userToken ?? false,
      tips: query.include?.tips ?? false,
    },
  });

  if (user) {
    return res.status(200).send({ user });
  }
  // createApiError('Something went wrong.');
};

const find = async (req: UserApi.Find.Req, res: UserApi.Find.Res) => {
  // const parsedQuery = userApi.find.query.parse(req.query);
  const { query } = userApi.find.parse({ ...req });

  const user = await userService.find({
    where: { nick: query.nick, address: query.address },
    include: {
      avatar: true,
      streamer: query.include?.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: query.include?.userToken ?? false,
      tips: query.include?.tips ?? false,
    },
  });

  if (user) {
    return res.status(200).send({ user });
  }
  // createApiError('Something went wrong.');
};

const validate = async (
  req: UserApi.Validate.Req,
  res: UserApi.Validate.Res
) => {
  const { body } = userApi.validate.parse({ ...req });

  const userExist = await userService.checkIfExist({
    OR: [{ email: body.email }, { nick: body.nick }],
  });

  // throw error if exist
  if (userExist) {
    const errors: ValidationError[] = [];
    if (userExist.email === body.email) {
      const validationError = new ValidationError(
        'email',
        `Email used.`,
        `Email already used by someone.`,
        `email.unique`
      );
      errors.push(validationError);
    }
    if (userExist.nick === body.nick) {
      const validationError = new ValidationError(
        'nick',
        `Nick used.`,
        `Nick already used by someone.`,
        `nick.unique`
      );
      errors.push(validationError);
    }
    throw errors;
  }

  res.status(StatusCodes.OK).json({ message: 'Validation passed.' });
};

const create = async (req: UserApi.Create.Req, res: Response) => {
  const { body } = userApi.create.parse({ ...req });

  const userExist = await userService.checkIfExist({
    OR: [{ address: body.address }, { email: body.email }, { nick: body.nick }],
  });

  // throw error if exist
  if (userExist) {
    const errors: ValidationError[] = [];
    if (userExist.address === body.address) {
      const validationError = new ValidationError(
        'address',
        `Already registered.`,
        `The wallet has already been registered. Go to login page or disconnect wallet from DAPP and then change wallet.`,
        `address.unique`
      );
      errors.push(validationError);
    }
    if (userExist.email === body.email) {
      const validationError = new ValidationError(
        'email',
        `Email used.`,
        `Email already used by someone.`,
        `email.unique`
      );
      errors.push(validationError);
    }
    if (userExist.nick === body.nick) {
      const validationError = new ValidationError(
        'nick',
        `Nick used.`,
        `Nick already used by someone.`,
        `nick.unique`
      );
      errors.push(validationError);
    }
    throw errors;
  }

  const streamer: Prisma.StreamerCreateNestedOneWithoutUserInput =
    body.roles.includes('streamer')
      ? {
          create: {
            page: {
              create: {
                role: 'streamer',
                affixUrl: body.nick,
              },
            },
          },
        }
      : {};

  const user = await userService.create({
    ...body,
    activeRole: body.roles[0],
    streamer,
  });

  return res.status(200).send({ user });
};

export const userController = { findByNick, find, create, validate };
