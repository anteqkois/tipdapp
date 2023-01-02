import ethers from 'ethers';
import { Network } from '../types';

const providersList: Record<Network, ethers.ethers.providers.AlchemyProvider | ethers.ethers.providers.JsonRpcProvider> = {
  rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  localhost: new ethers.providers.JsonRpcProvider(),
  hardhat: new ethers.providers.JsonRpcProvider(),
};

const provider = providersList[process.env.NETWORK];
const signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
const deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);

export { signerAdmin, deployer, provider };
export { ethers };
