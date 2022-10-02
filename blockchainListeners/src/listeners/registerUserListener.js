// import { create } from '../api/userToken.js';
import { QoistipSign } from '../qoistipSignContract.js';
import { createToken } from '../services/userTokenService.js';

// setInterval(async () => {
//   await create({ test: true, message: 'Test message' });
// }, 2000);

QoistipSign.on('NewUser', async (userAddress, userToken, event) => {
  createToken({ userAddress, userToken, txHash: event.transactionHash });
});
