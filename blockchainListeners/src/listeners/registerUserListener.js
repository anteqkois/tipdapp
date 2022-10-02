import { QoistipSign } from '../qoistipSignContract.js';
import { createToken } from '../services/userTokenService.js';

QoistipSign.on('NewUser', async (userAddress, userToken, event) => {
  createToken({ userAddress, userToken, txHash: event.transactionHash });
});
