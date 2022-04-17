const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Qoistip = await hre.ethers.getContractFactory('Qoistip');
  const qoistip = await hre.upgrades.deployProxy(Qoistip, [], { kind: 'uups' });

  // const qoistip = await Greeter.deploy();

  const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
  const qoistipPriceAggregator = await QoistipPriceAggregator.deploy();
  await qoistipPriceAggregator.deployed();

  const QoistipV2 = await ethers.getContractFactory('QoistipV2');
  qoistip = await upgrades.upgradeProxy(qoistip, QoistipV2, {
    call: { fn: 'setQoistipPriceAggregator', args: [qoistipPriceAggregator.address] },
  });

  console.log('Qoistip deployed to:', qoistip.address);
  console.log('QoistipPriceAggregator deployed to:', qoistipPriceAggregator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
