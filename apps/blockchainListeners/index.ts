import { dotenvConfig } from '@tipdapp/server';
import { startToListen } from './src/eventListeners';

dotenvConfig();

const main = async () => {
  console.log('> Start blockchain listeners');
  startToListen();
};

main();
