const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['../package.ts'],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outdir: './lib/esm',
    // minify: true,
    // outfile: 'out.js',
    tsconfig: './tsconfig.esm.json',
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

//   .build({
//     entryPoints: ['app.jsx'],
//     bundle: true,
//     outfile: 'out.js',
//   })
//   .catch(() => process.exit(1));

// import * as esbuild from 'esbuild';

// esbuild.build({
//   // entryPoints: ['dist/es6/package.js'],
//   entryPoints: ['../src/config/paths.ts', '../package.ts'],
//   bundle: true,
//   outfile: 'out.js',
//   tsconfig: './tsconfig.es6.json',
// });
