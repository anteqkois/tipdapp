import { Modify } from '@/types/index';
import { UserSession } from '@tipdapp/server';
import { Address } from 'wagmi';

export type UserSessionDapp = Modify<UserSession, { address: Address }>;
