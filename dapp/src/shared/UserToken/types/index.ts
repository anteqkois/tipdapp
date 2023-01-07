import { Modify } from '@/types/index';
import { UserToken } from '@tipdapp/server';
import { Address, Hash } from '@wagmi/core';

export type UserTokenDapp = Modify<UserToken, { address: Address; txHash: Hash }>;
