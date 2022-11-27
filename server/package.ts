//TODO? to create two with .cjs and .js extension you must use roolup, becouse it isn't possible to use outFile flag in tsconfig
//TODO? linking doesn't work in production ! Public package in npm repository to use it like basic package
export type {
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
// import * as UserValidation from '../../src/validation/signUpValidaion'
export * from './src/validation/userValidation';

// export type User2 = User
//TODO add errors
