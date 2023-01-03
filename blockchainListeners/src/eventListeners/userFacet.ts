import { provider } from '../lib/ethersProvider.js';

setInterval(async () => {
  console.log(await provider.getBlockNumber());
  // console.log('Im work');
}, 100000000);
