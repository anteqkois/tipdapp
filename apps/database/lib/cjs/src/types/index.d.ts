export * from './models';
export type PartialExcept<T, U extends string[]> = {
    [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
    [K in keyof T as K extends U[number] ? never : K]: T[K];
};
