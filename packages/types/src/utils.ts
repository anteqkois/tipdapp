import { Role } from '@tipdapp/prisma/types';
import { Address } from './crypto';

type PartialExcept<T, U extends string[]> = {
  [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
  [K in keyof T as K extends U[number] ? never : K]: T[K];
};

type DecodedUser = {
  ip: string;
  address: Address;
  nick: string;
  roles: Role[];
  activeRole: Role;
};

type ModifyObjectKey<T, R> = Omit<T, keyof R> & R;
// EXAMPLE type Body = ModifyObjectKey<{ message: number }, { message: string }>;

export type { PartialExcept, DecodedUser, ModifyObjectKey };
