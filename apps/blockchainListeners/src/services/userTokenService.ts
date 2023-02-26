import { UserToken__factory } from '@tipdapp/contracts';
import { NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { infoLogger } from '@tipdapp/server';
import { Address, Hash, UserToken } from '@tipdapp/types';
import { netowrkInfo } from '../config/network';
import { provider } from '../lib/ethersProvider';
import { publishMessage } from '../lib/rabbitmq';

type EventData = NewUserEventObject & { txHash: string };

export const saveUserTokenData = async (eventData: EventData) => {
  const userToken = UserToken__factory.connect(
    eventData.userTokenAddress,
    provider
  );

  const symbol = await userToken.symbol();
  console.log('symbol :>> ', symbol);
  const name = await userToken.name();
  console.log('name :>> ', name);

  const data: UserToken = {
    address: eventData.userTokenAddress as Address,
    chainId: netowrkInfo.id,
    name,
    symbol,
    txHash: eventData.txHash as Hash,
    userAddress: eventData.userAddress,
  };

  infoLogger.info('New user token', data);
  publishMessage('userToken', data);
};
