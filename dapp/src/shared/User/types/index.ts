import { UserTokenDapp } from '@/shared/UserToken/types';
import { Modify } from '@/types/index';
import { UserSession, NestedStreamer } from '@tipdapp/server';
import { Address } from 'wagmi';

export type UserSessionDapp = Modify<
  UserSession,
  { address: Address; userToken: UserTokenDapp; streamer: NestedStreamer }
>;
