import UserTokenJSON from '../../artifacts/localhost/UserToken.json' assert { type: 'json' };
import { create } from '../api/userToken.js';
import ethers, { provider } from '../lib/ethersProvider.js';

const getUserTokenData = async ({ userToken, userAddress, txHash }) => {
  const UserToken = new ethers.Contract(userToken, UserTokenJSON.abi, provider);
  const symbol = await UserToken.symbol();
  const name = await UserToken.name();
  const { chainId } = await provider.getNetwork();

  const data = {
    address: userToken,
    symbol,
    name,
    chainId,
    txHash,
    userAddress,
  };

  return data;
};

export const createToken = async (eventData) => {
  const userTokenData = await getUserTokenData(eventData);
  console.log('Create new token: ', userTokenData);
  create(userTokenData);
};
