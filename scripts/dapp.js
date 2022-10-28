#!/usr/bin/env zx
import 'zx/globals';

$.verbose = true;

// process.on('uncaughtException', (err, origin) => {
//   console.log('ERRRORR', err);
// });

try {
  cd('dapp');
  // await $`npx prisma db push --force-reset && npx prisma db seed`;
  $`NODE_ENV=development npm run dev`;
} catch (error) {
  console.log(chalk.red('Error encourage'), error);
}
