type PartialExcept<T, U extends string[]> = {
  [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
  [K in keyof T as K extends U[number] ? never : K]: T[K];
};

type Roles = 'streamer' | 'charity' | 'shop';

type DecodedUser = { ip: string; address: string; nick: string; roles: Roles[]; activeRole: Roles };

export type { PartialExcept, DecodedUser };