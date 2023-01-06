import { provider } from '../lib/ethersProvider';
import { publishMessage } from '../lib/rabbitmq';
import './userFacet';

provider.on('block', async (block) => {
    await publishMessage('userToken', { data: {blockNumber: block}, dateTime: new Date() });
  console.log(block);
});
