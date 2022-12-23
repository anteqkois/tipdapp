#!/bin/sh
cd contracts
npx hardhat node & sleep 3 && npm run deploy:dev