import { UserSessionDapp } from '@/shared/User/types';
import { UserValidation } from '@tipdapp/server';
import { SiweMessage } from 'siwe';
import { api } from './apiConfig';

// VALIDATE
export const validateFormData = async (body: any) =>
  await api.post('/auth/validate', body);

// NONCE
type GetNonceResponse = {
  nonce: string;
};

export const getNonce = async () =>
  await api.get<any, GetNonceResponse>('/auth/nonce');

// VERIFY
type PostVerifyMessageResponse = {
  user: UserSessionDapp;
};

type VerifyMessageBody = {
  message: SiweMessage;
  signature: string;
};

export const verifyMessage = async (body: VerifyMessageBody) =>
  await api.post<any, PostVerifyMessageResponse>('/auth/verify', body);

// LOGOUT
type LogoutResponse = {
  message: string;
};

export const logoutUser = async () =>
  await api.get<any, LogoutResponse>('/auth/logout');

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
  await api.post<any, SignUpResponse>('/auth/signup', body);

// REFRESH
type RefreshResponse = {
  message: string;
};

export const refreshToken = async () =>
  await api.get<RefreshResponse>('/auth/refresh');
