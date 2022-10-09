import 'next-auth';
import { UserSession } from './ts/models';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      user: UserSession;
      // user: User;
    };
    // &  DefaultSession['user'];
  }
}
