import { UserFacet } from '../contracts/userFacet.js';
import { saveUserTokenData } from '../services/userTokenService.js';


UserFacet.on('NewUser', async (userAddress,  userTokenAddress, event) => {
  console.log(event);
  saveUserTokenData({ userAddress, userTokenAddress, txHash: event.transactionHash });
});
