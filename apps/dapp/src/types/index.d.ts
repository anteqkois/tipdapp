type AsyncStatus = 'idle' | 'loading' | 'success' | 'fail';
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type ModifyObjectKey<T, R> = Omit<T, keyof R> & R;

export type { AsyncStatus, AuthStatus, ModifyObjectKey };
