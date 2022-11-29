export type {
  ApiError,
  ValidationError,
  ValidationErrors,
} from './src/middlewares/error';
export type {
  File,
  Prisma,
  Role,
  Streamer,
  Tip,
  Tipper,
  TipUI,
  Token,
  User,
  UserSession,
  UserToken,
  Widget,
  Withdraw,
  ZodParseErrors,
} from './src/types';
export * from './src/validation/index';
//TODO? to create two with .cjs and .js extension you must use roolup, becouse it isn't possible to use outFile flag in tsconfig
//TODO? linking doesn't work in production ! Public package in npm repository to use it like basic package
