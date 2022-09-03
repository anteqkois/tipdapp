import { config } from 'dotenv';
import ethers, { BigNumber, providers, Wallet } from 'ethers';
({ config }.config({ path: '../../.env' }));

// ethers.BigNumber.fromNotation = (number) => {
//   return new BigNumber.from(ethers.utils.hexValue(`0x${number.toString(16)}`));
// };

let provider, privateKey;

switch (process.env.STATE) {
  case 'dev-local':
    privateKey = process.env.WALLET_PRIVATE_KEY_LOCAL;
    provider = new providers.JsonRpcProvider('http://127.0.0.1:8545/');
    break;
  case 'dev-rinkeby':
    privateKey = process.env.WALLET_PRIVATE_KEY_RINKEBY;
    provider = new providers.AlchemyProvider('rinkeby');
    break;
  case 'production':
    privateKey = process.env.WALLET_PRIVATE_KEY_LOCAL;
    provider = new providers.JsonRpcProvider('http://127.0.0.1:8545/');
    break;
}

const wallet = new Wallet(privateKey, provider);

export { wallet as signer };
export { provider };

export default ethers;
// export default {
//   signer: wallet,
//   provider,
// };
