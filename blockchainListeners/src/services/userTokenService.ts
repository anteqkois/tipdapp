// import UserTokenJSON from '../../artifacts/localhost/UserToken.json' assert { type: 'json' };
import { UserToken__factory } from '@tipdapp/contracts';
import { NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet.js';
import { UserToken } from '@tipdapp/server';
import { netowrkInfo } from '../config/network.js';
import { provider } from '../lib/ethersProvider.js';

type EventData = NewUserEventObject & { txHash: string };

export const saveUserTokenData = async (eventData: EventData) => {
  const userToken = UserToken__factory.connect(eventData.userTokenAddress, provider);

  const symbol = await userToken.symbol();
  const name = await userToken.name();

  const data: UserToken = {
    address: eventData.userTokenAddress,
    chainId: netowrkInfo.id,
    name,
    symbol,
    txHash: eventData.txHash,
    userAddress: eventData.userAddress,
  };

  console.log('Create new token: ', data);
  await channel.assertQueue('userToken');
  await channel.sendToQueue('userToken', Buffer.from(JSON.stringify(data)));

  //  await channel.assertQueue('jobs');
  //     await channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
};
