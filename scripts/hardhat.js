#!/usr/bin/env zx
import 'zx/globals';

$.verbose = true;

try {
  cd('contracts');
  $`npx hardhat node`;
  await sleep(5000);
  await $`npm run deploy-dev`;
  // cd('../blockchainListeners');
  // $`npm run start`;
} catch (error) {
  console.log(chalk.red('Error encourage'), error);
}
