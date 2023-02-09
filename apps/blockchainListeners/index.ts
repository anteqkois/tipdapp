import './src/config/dotenv';
import { startListen } from './src/eventListeners';

const main = async () => {
  console.log('> Start blockchain listeners');
  startListen();
};

main();
