type PartialExcept<T, U extends string[]> = {
  [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
  [K in keyof T as K extends U[number] ? never : K]: T[K];
};

type Role = 'streamer' | 'charity' | 'shop';

type DecodedUser = { ip: string; address: string; nick: string; roles: Role[]; activeRole: Role };

type ModifyObjectKey<T, R> = Omit<T, keyof R> & R;

export type { PartialExcept, DecodedUser, Role, ModifyObjectKey };
