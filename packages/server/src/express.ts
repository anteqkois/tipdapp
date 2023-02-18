import { DecodedUser } from '@tipdapp/types';

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
