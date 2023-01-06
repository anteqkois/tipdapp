import { hardhat } from '@wagmi/chains';
import ethers from 'ethers';
import { Network } from '../types';

const providersList: Record<
  Network,
  ethers.ethers.providers.AlchemyProvider | ethers.ethers.providers.JsonRpcProvider | ethers.ethers.providers.BaseProvider
> = {
  // rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  // mainnet: ethers.getDefaultProvider(),
  // localhost: new ethers.providers.JsonRpcProvider(),
  hardhat: new ethers.providers.JsonRpcProvider(hardhat.rpcUrls.default.http[0], { name: hardhat.network, chainId: hardhat.id }),
};

const provider = providersList[process.env.NETWORK];
const signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
const deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);

export { signerAdmin, deployer, provider };
export { ethers };
