import { Network } from '../types';
import { Chain, hardhat } from './chains';
import './dotenv';

const networks: Record<Network, Chain> = {
  hardhat: hardhat,
};

export const netowrkInfo = networks[process.env.NETWORK];
