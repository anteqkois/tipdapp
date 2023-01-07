import { NewUserEvent, NewUserEventObject } from '@tipdapp/contracts/typechain-types/contracts/Tipdapp/facets/UserFacet';
import { UserFacet } from '../contracts/userFacet';
import { saveUserTokenData } from '../services/userTokenService';

//TODO impplement burn amount listener
// export const burnUserTokenListener = () =>
//   UserFacet.on(
//     'Tran',
//     async (
//       userAddress: NewUserEventObject['userAddress'],
//       userTokenAddress: NewUserEventObject['userTokenAddress'],
//       event: NewUserEvent,
//     ) => {
//       saveUserTokenData({ userAddress, userTokenAddress, txHash: event.transactionHash });
//     },
//   );
