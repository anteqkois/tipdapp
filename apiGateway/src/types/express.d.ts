import { DecodedUser } from ".";

declare global {
  namespace Express {
    export interface Request {
      user: DecodedUser;
      address: string;
      roles: string[];
      ip: strings;
    }
  }
}
