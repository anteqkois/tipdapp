import { userTokenCreate } from './blockchainConsumer';

export const startQueueConsumers = () => {
  userTokenCreate();
};
