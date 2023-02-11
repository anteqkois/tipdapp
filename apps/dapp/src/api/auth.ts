import { UserSessionDapp } from '@/shared/User/types';
import { Tipper, UserValidation } from '@tipdapp/database';
import { SiweMessage } from 'siwe';
import { api } from './apiConfig';

// VALIDATE
export const validateFormData = async (body: any) =>
  api.post('/user/validate', body);

// NONCE
type GetNonceResponse = {
  nonce: string;
};
export const getNonce = async () =>
  api.get<any, GetNonceResponse>('/auth/nonce');

// VERIFY
// type PostVerifyMessageResponse<T extends 'user'|'tipper'> = {
//   user: UserSessionDapp;
// };
type PostVerifyMessageResponse<T extends 'user' | 'tipper'> = T extends 'user'
  ? { user: UserSessionDapp }
  : { tipper: Tipper };

type VerifyMessageBody = {
  message: SiweMessage;
  signature: string;
  type: 'user' | 'tipper';
};

// export const verifyMessage = async <T extends 'user' | 'tipper'>(body: VerifyMessageBody) => {
export const verifyMessage = async <T extends VerifyMessageBody['type']>(
  body: VerifyMessageBody
) => 
   api.post<any, PostVerifyMessageResponse<T>>(
    '/auth/verify',
    body
  )
  // if (body.type === 'user')
  //   return await api.post<any, PostVerifyMessageResponse<T>>(
  //     '/auth/verify',
  //     body
  //   );
  // if (body.type === 'tipper')
  //   return await api.post<any, PostVerifyMessageResponse<T>>(
  //     '/auth/verify',
  //     body
  //   );
;

// LOGOUT
type LogoutResponse = {
  message: string;
};
export const logoutUser = async () =>
  api.get<any, LogoutResponse>('/auth/logout');

// SIGNUP
type SignUpResponse = {
  message: string;
  user: UserSessionDapp;
};
type SignUpBody = {
  message: SiweMessage;
  signature: string;
  formData: UserValidation.CreateUser;
  // formData: any;
};
export const signUp = async (body: SignUpBody) =>
  api.post<any, SignUpResponse>('/auth/signup', body);

// REFRESH TOKEN
type RefreshResponse = {
  message: string;
};
export const refreshToken = async () =>
  api.get<RefreshResponse>('/auth/refresh');

// REFRESH USER SESSION
type RefreshUserSessionResponse = {
  message: string;
  user: UserSessionDapp;
};
// type RefreshSessionBody = {
//   message: SiweMessage;
//   signature: string;
//   formData: UserValidation.CreateUser;
//   // formData: any;
// };
export const refreshUserSession = async () =>
  api.get<any, RefreshUserSessionResponse>('/auth/refreshUserSession');
