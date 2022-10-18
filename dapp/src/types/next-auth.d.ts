import 'next-auth';
import { UserSession } from './models';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSession;
    // user: {
    //   /** The user's postal address. */
    //    UserSession;
    //   // user: User;
    // };
    // &  DefaultSession['user'];
  }
}
