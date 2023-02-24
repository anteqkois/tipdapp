import { Tipper, UserSession } from '@tipdapp/types';
import { SiweMessage } from 'siwe';
import { AuthApi, UserApi } from '../validation';
import { api } from './axiosConfig';

// VALIDATE
const validateFormData = async (body: UserApi.Validate.Body) =>
  api.post<never, UserApi.Validate.ResBody>('/user/validate', body);

// NONCE
const getNonce = async () =>
  api.get<
    never,
    {
      nonce: string;
    }
  >('/auth/nonce');

// VERIFY
type PostVerifyMessageResponse<T extends 'user' | 'tipper'> = T extends 'user'
  ? { user: UserSession }
  : { tipper: Tipper };

type VerifyMessageBody = {
  message: SiweMessage;
  signature: string;
  type: 'user' | 'tipper';
};

const verifyMessage = async <T extends VerifyMessageBody['type']>(
  body: VerifyMessageBody
) => api.post<never, PostVerifyMessageResponse<T>>('/auth/verify', body);

// LOGOUT
const logoutUser = async () =>
  api.get<
    never,
    {
      message: string;
    }
  >('/auth/logout');

// SIGNUP
const signUp = async (body: AuthApi.SignUp.Body) =>
  api.post<never, AuthApi.SignUp.ResBody>('/auth/signup', body);

// REFRESH TOKEN
const refreshToken = async () =>
  api.get<
    never,
    {
      message: string;
    }
  >('/auth/refresh');

// REFRESH USER SESSION
const refreshUserSession = async () =>
  api.get<
    never,
    {
      message: string;
      user: UserSession;
    }
  >('/auth/refreshUserSession');

const auth = {
  validateFormData,
  getNonce,
  verifyMessage,
  logoutUser,
  signUp,
  refreshToken,
  refreshUserSession,
};

export { auth };
