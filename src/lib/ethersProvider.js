import ethers from 'ethers';

// ethers.BigNumber.fromNotation = (number) => {
//   return new BigNumber.from(ethers.utils.hexValue(`0x${number.toString(16)}`));
// };

const providersList = {
  rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  local: new ethers.providers.JsonRpcProvider(),
  hardhat: new ethers.providers.JsonRpcProvider(),
};

// let signerAdmin, deployer, provider;

console.log(process.env);
console.log(process.env.NETWORK);

const provider = providersList[process.env.NETWORK];
const signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
const deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);

export { signerAdmin, deployer, provider };

export default ethers;
// import ethers from 'ethers';

// // ethers.BigNumber.fromNotation = (number) => {
// //   return new BigNumber.from(ethers.utils.hexValue(`0x${number.toString(16)}`));
// // };

// const providersList = {
//   rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
//   local: new ethers.providers.JsonRpcProvider(),
//   hardhat: new ethers.providers.JsonRpcProvider(),
// };

// let signerAdmin, deployer, provider;

// console.log(process.env);
// console.log(process.env.NETWORK);

// const config = () => {
//   provider = providersList[process.env.NETWORK];
//   signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
//   deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);
// };
// config();

// export { signerAdmin, deployer, provider, config };

// export default ethers;
