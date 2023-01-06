// import UserTokenJSON from '../../artifacts/localhost/UserToken.json' assert { type: 'json' };
// import { UserToken__factory } from '@tipdapp/contracts';
// import * as contract from '@tipdapp/contracts';
// const { UserToken__factory } = contract;
// import { NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { UserToken__factory } from '@tipdapp/contracts';
import { NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { UserToken } from '@tipdapp/server';
import { netowrkInfo } from '../config/network';
import { provider } from '../lib/ethersProvider';
import { publishMessage } from '../lib/rabbitmq';

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
  publishMessage('userToken', data);
};
