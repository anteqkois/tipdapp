import { UserSession } from '@/types/models';
import { SiweMessage } from 'siwe';
import { api } from './apiConfig';

//TODO use get with queryParams
export const validateFormData = async (body: any) =>
  await api.post('/auth/validate', body);

type GetNonceResponse = {
  nonce: string;
};

export const getNonce = async () =>
  await api.get<GetNonceResponse>('/auth/nonce');

type PostVerifyMessageResponse = {
  user: UserSession;
};

type VerifyMessageBody = {
  message: SiweMessage;
  signature: string;
};

export const verifyMessage = async (body: VerifyMessageBody) =>
  await api.post<PostVerifyMessageResponse>('/auth/verify', body);

type LogoutResponse = {
  message: string;
};

export const logoutUser = async () =>
  await api.get<LogoutResponse>('/auth/logout');
