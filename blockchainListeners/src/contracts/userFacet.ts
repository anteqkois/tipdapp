import { address, UserFacet__factory } from '@tipdapp/contracts';
import { netowrkInfo } from '../config/network.js';
import { provider } from '../lib/ethersProvider.js';
import { Network } from '../types/index.js';

// export const UserFacet = new ethers.Contract(address[process.env.NETWORK as Network].UserFacet, UserFacetAbi, provider) as UserFacet;
export const UserFacet = UserFacet__factory.connect(address[netowrkInfo.network as Network].Diamond, provider);
