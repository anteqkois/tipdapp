import { address, UserFacet__factory } from '@tipdapp/contracts';
import { netowrkInfo } from '../config/network';
import { provider } from '../lib/ethersProvider';
import { Network } from '../types';

export const UserFacet = UserFacet__factory.connect(address[netowrkInfo.network as Network].Diamond, provider);
