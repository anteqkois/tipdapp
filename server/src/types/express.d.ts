export {};

type UserJWT = {
  address: string;
};

declare global {
  namespace Express {
    export interface Request {
      user: UserJWT;
    }
  }
}
