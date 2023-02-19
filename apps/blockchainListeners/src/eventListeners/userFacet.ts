import { NewUserEvent, NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { UserFacet } from '../contracts/userFacet';
import { saveUserTokenData } from '../services/userTokenService';

export const newUserListener = () =>
  UserFacet.on(
    'NewUser',
    async (
      userAddress: NewUserEventObject['userAddress'],
      userTokenAddress: NewUserEventObject['userTokenAddress'],
      event: NewUserEvent,
    ) => {
      saveUserTokenData({ userAddress, userTokenAddress, txHash: event.transactionHash });
    },
  );

// TODO Tip event, save tip to DB and increase mint amount of given user token
