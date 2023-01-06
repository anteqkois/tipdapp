// import { address, UserFacet__factory } from '@tipdapp/contracts';
import * as contract from '@tipdapp/contracts';
console.log(contract);
// const {UserFacet__factory, address} = contract;
import { netowrkInfo } from '../config/network';
import { provider } from '../lib/ethersProvider';
import { Network } from '../types';
// export const UserFacet = new ethers.Contract(address[process.env.NETWORK as Network].UserFacet, UserFacetAbi, provider) as UserFacet;

export const UserFacet = contract.UserFacet__factory.connect(contract.address[netowrkInfo.network as Network].Diamond, provider);
