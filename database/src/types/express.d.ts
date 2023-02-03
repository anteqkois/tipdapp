import { DecodedUser } from './models';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: DecodedUser;
      address: string;
      roles: string[];
    }
  }
}
