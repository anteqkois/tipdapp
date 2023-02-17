const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outdir: './lib',
    minify: true,
    tsconfig: './tsconfig.build.json',
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
