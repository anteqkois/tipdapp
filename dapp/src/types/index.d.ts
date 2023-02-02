export type AsyncStatus = 'idle' | 'loading' | 'success' | 'fail';
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type ModifyObjectKey<T, R> = Omit<T, keyof R> & R;
