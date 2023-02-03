import { UserTokenDapp } from '@/shared/UserToken/types';
import { ModifyObjectKey } from '@/types/index';
import { NestedStreamer, UserSession } from '@tipdapp/database';
import { Address } from 'wagmi';

export type UserSessionDapp = ModifyObjectKey<
  UserSession,
  { address: Address; userToken: UserTokenDapp; streamer: NestedStreamer }
>;
