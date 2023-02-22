import { ethers } from 'ethers';
import { hardhat } from '../config/chains';
import { currentNetwork } from '../config/network';

const providersList: Record<
  string,
  | ethers.providers.AlchemyProvider
  | ethers.providers.JsonRpcProvider
  | ethers.providers.BaseProvider
> = {
  // rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  // mainnet: ethers.getDefaultProvider(),
  // localhost: new ethers.providers.JsonRpcProvider(),
  hardhat: new ethers.providers.JsonRpcProvider(
    hardhat.rpcUrls.default.http[0],
    { name: hardhat.network, chainId: hardhat.id }
  ),
};

const provider = providersList[currentNetwork];
const signerAdmin = new ethers.Wallet(
  process.env.SIGNER_WALLET_PRIVATE_KEY,
  provider
);
const deployer = new ethers.Wallet(
  process.env.DEPLOYER_WALLET_PRIVATE_KEY,
  provider
);

export { signerAdmin, deployer, provider };
export { ethers };
