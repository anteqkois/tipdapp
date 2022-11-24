export {};

// type AuthUser = {
//   address: string;
// };

declare global {
  namespace Express {
    export interface Request {
      user: DecodedUser;
      address: string;
      roles: string[];
    }
  }
}
