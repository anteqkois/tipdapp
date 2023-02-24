import { auth } from './auth';
import { page } from './page';
import { tipper } from './tipper';
import { tips } from './tips';
import { token } from './token';
import { user } from './user';
import { userToken } from './userToken';

const apiClient = { page, auth, tipper, tips, token, user, userToken };
export { apiClient };
