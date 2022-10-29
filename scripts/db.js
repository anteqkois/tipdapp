#!/usr/bin/env zx
import 'zx/globals';

$.verbose = true;

try {
  await $`sudo service postgresql start`;
} catch (error) {
  console.log(chalk.red('Error encourage'), error);
}
