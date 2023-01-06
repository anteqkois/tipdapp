import { Chain, hardhat } from '@wagmi/chains';
import { Network } from '../types';
import './dotenv';

const networks: Record<Network, Chain> = {
  hardhat: hardhat,
};

export const netowrkInfo = networks[process.env.NETWORK];
