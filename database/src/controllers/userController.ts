import { createApiError, ValidationError } from '@middlewares/error';
import { Prisma } from '@prisma/client';
import { userService } from '@services/userService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userApi, UserApi } from '../validation/userApi';

const findByNick = async (
  req: Request<{}, {}, {}, UserApi.FindByNick.Query>,
  res: Response
) => {
  const parsedParams = userApi.findByNick.params.parse(req.params);
  const parsedQuery = userApi.findByNick.query.parse(req.query);

  const user = await userService.find({
    where: { nick: parsedParams.nick },
    include: {
      avatar: true,
      streamer: parsedQuery.include.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: parsedQuery.include.userToken,
      tips: parsedQuery.include.tips,
    },
  });

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};

const find = async (
  req: Request<{}, {}, {}, UserApi.Find.Query>,
  res: Response
) => {
  const parsedQuery = userApi.find.query.parse(req.query);

  console.log('parsedQuery', parsedQuery);

  const user = await userService.find({
    where: { nick: parsedQuery.nick, address: parsedQuery.address },
    include: {
      avatar: true,
      streamer: parsedQuery.include?.streamer
        ? { include: { activeTokens: true, page: true } }
        : false,
      userToken: parsedQuery.include?.userToken ?? false,
      tips: parsedQuery.include?.tips ?? false,
    },
  });

  console.log(user);

  if (user) {
    return res.status(200).send({ user: user });
  } else {
    createApiError('Something went wrong.');
  }
};

const validate = async (
  req: UserApi.Validate.Req,
  res: UserApi.Validate.Res
) => {
  // const { email, nick } = req.body;

  // try {
  //   //Validate schema
  //   userValidation.createParse(req.body);

  //   //Validate unique
  //   const user = await userService.checkIfExist({
  //     OR: [{ email }, { nick }],
  //   });

  //   if (user) {
  //     const errors: ValidationError[] = [];
  //     if (user.email === email) {
  //       const validationError = new ValidationError(
  //         'email',
  //         `Email used.`,
  //         `Email already used by someone.`,
  //         `email.unique`
  //       );
  //       errors.push(validationError);
  //     }
  //     if (user.nick === nick) {
  //       const validationError = new ValidationError(
  //         'nick',
  //         `Nick used.`,
  //         `Nick already used by someone.`,
  //         `nick.unique`
  //       );
  //       errors.push(validationError);
  //     }
  //     throw errors;
  //   }
  // } catch (errors) {
  //   throwIfOperational(
  //     errors,
  //     "Something went wrong, data didn't pass validation."
  //   );
  // }

  const { body } = userApi.validate.parse({ ...req });

  const userExist = await userService.checkIfExist({
    OR: [{ email: body.email }, { nick: body.nick }],
  });

  //throw error if exist
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
  console.log('req.body', req.body);
  const { body } = userApi.create.parse({ ...req });

  const userExist = await userService.checkIfExist({
    OR: [{ address: body.address }, { email: body.email }, { nick: body.nick }],
  });

  //throw error if exist
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

  const user = await userService.create({ ...body, streamer });

  return res.status(200).send({ user: user });
};

export const userController = { findByNick, find, create, validate };
