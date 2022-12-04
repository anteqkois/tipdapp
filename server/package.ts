// import './src/config/paths';

export {
  ApperanceMode,
  File,
  Prisma,
  Role,
  Streamer,
  Tip,
  Tipper,
  Token,
  User,
  UserToken,
  Widget,
  Withdraw,
} from '@prisma/client';
export {
  ApiError,
  ValidationError,
  ValidationErrors,
} from './src/middlewares/error';
export type { TipUI, UserSession } from './src/types';
export * from './src/validation/index';

//TODO? to create two with .cjs and .js extension you must use roolup, becouse it isn't possible to use outFile flag in tsconfig
//TODO? linking doesn't work in production ! Public package in npm repository to use it like basic package
