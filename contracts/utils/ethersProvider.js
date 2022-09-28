const ethers = require('ethers');

const providersList = {
  rinkeby: new ethers.providers.AlchemyProvider('rinkeby'),
  hardhat: new ethers.providers.JsonRpcProvider(),
};

const provider = providersList[process.env.NETWORK];

const signerAdmin = new ethers.Wallet(process.env.SIGNER_WALLET_PRIVATE_KEY, provider);
const deployer = new ethers.Wallet(process.env.DEPLOYER_WALLET_PRIVATE_KEY, provider);

module.exports = { signerAdmin, deployer, provider };
