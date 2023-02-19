import { Network } from '../types';
import { Chain, hardhat } from './chains';

const networks: Record<Network, Chain> = {
  hardhat,
};

export const netowrkInfo = networks[process.env.NETWORK];
