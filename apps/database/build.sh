#!/bin/zsh
rm -rf lib
npx prisma generate
node esbuild.config.js
# tsc --build tsconfig.esm.json && tsc --build tsconfig.cjs.json
# where tsc && tsc --build tsconfig.esm.json


# where tsc > --build tsconfig.esm.json 
# /Users/anteqkois/.nvm/versions/node/v18.12.0/bin/tsc --build tsconfig.esm.json