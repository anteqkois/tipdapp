const ethers = require('ethers');
require('dotenv').config({ path: '../.env' });

let provider, privateKey;

switch (process.env.STATE) {
  case 'dev-local':
    privateKey = process.env.WALLET_PRIVATE_KEY_LOCAL;
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    break;
  case 'dev-rinkeby':
    privateKey = process.env.WALLET_PRIVATE_KEY_RINKEBY;
    provider = new ethers.providers.AlchemyProvider('rinkeby');
    break;

  default:
    privateKey = process.env.WALLET_PRIVATE_KEY_LOCAL;
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    break;
}

const wallet = new ethers.Wallet(privateKey, provider);

provider.on('block', (blockNumber) => {
  console.log('Minted block:  ', blockNumber);
});

module.exports = { signer: wallet, provider };
