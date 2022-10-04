#!/usr/bin/env zx
import 'zx/globals';

$.verbose = true;

// process.on('uncaughtException', (err, origin) => {
//   console.log('ERRRORR', err);
// });

try {
  await $`sudo service postgresql start`;

  cd('dapp');
  $`NODE_ENV=development npm run dev`;

  cd('../contracts');
  $`npx hardhat node`;
  await sleep(9000);
  await $`npm run deploy-dev`;
} catch (error) {
  console.log(chalk.red('Error encourage'), error);
}
