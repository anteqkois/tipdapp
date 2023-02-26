import { address, UserFacet__factory } from '@tipdapp/contracts';
import { HandledNetworks } from '@tipdapp/types';
import { netowrkInfo } from '../config/network';
import { provider } from '../lib/ethersProvider';

export const UserFacet = UserFacet__factory.connect(
  address[netowrkInfo.network as HandledNetworks].Diamond,
  provider
);
