import { NewUserEvent, NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { EventFragment } from 'ethers/lib/utils';
import { UserFacet } from '../contracts/userFacet';
import { saveUserTokenData } from '../services/userTokenService';

type t = NewUserEventObject
EventFragment

UserFacet.on(
  'NewUser',
  async (
    userAddress: NewUserEventObject['userAddress'],
    userTokenAddress: NewUserEventObject['userTokenAddress'],
    event: NewUserEvent,
  ) => {
    console.log(event);
    saveUserTokenData({ userAddress, userTokenAddress, txHash: event.transactionHash });
  },
);
