import { Chain, hardhat } from './chains';

const networks = new Map<string, Chain>([['hardhat', hardhat]]);

const currentNetwork = process.env.NETWORK;
const netowrkInfo = networks.get(currentNetwork) as Chain;

if (netowrkInfo === undefined) {
  throw new Error('Missing env, set NETWORK environment in your .env file.');
}

export { netowrkInfo, currentNetwork };
