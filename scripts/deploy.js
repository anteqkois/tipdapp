const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');
  await greeter.deployed();

  const ANQToken = await hre.ethers.getContractFactory('ANQToken');
  const anq = await Greeter.deploy();
  await anq.deployed();

  const Qoistip = await hre.ethers.getContractFactory('Qoistip');
  const qoistip = await Greeter.deploy();
  await qoistip.deployed();

  console.log('Greeter deployed to:', greeter.address);
  console.log('ANQToken deployed to:', anq.address);
  console.log('Qoistip deployed to:', qoistip.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
