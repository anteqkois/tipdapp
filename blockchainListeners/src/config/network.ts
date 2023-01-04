import { Chain, hardhat } from '@wagmi/chains';
import { Network } from '../types/index.js';
import './dotenv.js';

const networks: Record<Network, Chain> = {
  hardhat: hardhat,
};

export const netowrkInfo = networks[process.env.NETWORK];
