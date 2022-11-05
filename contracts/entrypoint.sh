#!/bin/sh
cd /app;

# Run hardhat node
npx hardhat node &
P1=$!

# Deploy contracts to local network 
sleep 5 &&
npm run deploy-dev
P2=$!

# wait to have ability to continue run hardhat node
wait $P1 $P2