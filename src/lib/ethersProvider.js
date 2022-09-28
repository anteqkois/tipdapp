import ethers from 'ethers';

// ethers.BigNumber.fromNotation = (number) => {
//   return new BigNumber.from(ethers.utils.hexValue(`0x${number.toString(16)}`));
// };

const providersList = {
  rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  development: new ethers.providers.JsonRpcProvider(),
};

let signerAdmin, deployer, provider;

const config = () => {
  provider = providersList[process.env.NODE_ENV];
  signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
  deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);
};

export { signerAdmin, deployer, provider, config };

export default ethers;
