import dotenv from 'dotenv';
dotenv.config({ path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '../../.env.development' });
// import { config as configEthers } from './lib/ethersProvider.js';
import './registerUserListener.js';

const main = () => {
  console.log('> Process start listening on smart contract events... ');
  console.log('> /src/services/index.js ');
};

main();
