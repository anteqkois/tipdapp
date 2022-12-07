export * from './models';
// export * from './prisma';
// export type ZodParseErrors = Record<string, string>;
export type PartialExcept<T, U extends string[]> = {
  [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
  [K in keyof T as K extends U[number] ? never : K]: T[K];
};

// type NestedKeys<T extends string, U extends string[]> = {
//   [K in keyof U]: U[K] extends `${T}.${infer V}` ? V : never;
// };

// type PartialExcept<T, U extends string[]> = {
//   [K in keyof T as K extends U[number] ? K : never]?: T[K];
// } & {
//   [K in keyof T as K extends U[number] ? never : K]: K extends string
//     ? PartialExcept<T[K], NestedKeys<K, U>>
//     : T[K];
// };
