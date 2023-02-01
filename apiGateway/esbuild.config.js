const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outdir: './lib/esm',
    minify: true,
    // outfile: 'out.js',
    tsconfig: './tsconfig.esm.json',
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

esbuild
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    format: 'cjs',
    platform: 'browser',
    outdir: './lib/cjs',
    minify: true,
    // outfile: 'out.js',
    tsconfig: './tsconfig.cjs.json',
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
