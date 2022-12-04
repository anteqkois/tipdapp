import { addAliases } from 'module-alias';
import 'module-alias/register';
import path from 'path';

addAliases({
  '@middlewares': path.join(__dirname, '../', 'middlewares'),
  '@types': path.join(__dirname, '../', 'types'),
  // '@middlewares': `${__dirname}/../middlewares/*`,
});
