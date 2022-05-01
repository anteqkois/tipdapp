const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(hre.network);

  console.log('Deploying contracts with the account:', deployer.address);

  const Qoistip = await hre.ethers.getContractFactory('Qoistip');
  const qoistip = await hre.upgrades.deployProxy(Qoistip, [], { kind: 'uups' });
  await qoistip.deployed();

  console.log('Qoistip deployed to:', qoistip.address);
  // harhat 0xaB7B4c595d3cE8C85e16DA86630f2fc223B05057
  // localhost 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

  // const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
  // const qoistipPriceAggregator = await QoistipPriceAggregator.deploy();
  // await qoistipPriceAggregator.deployed();

  // const QoistipV2 = await ethers.getContractFactory('QoistipV2');
  // qoistip = await upgrades.upgradeProxy(qoistip, QoistipV2, {
  //   call: { fn: 'setQoistipPriceAggregator', args: [qoistipPriceAggregator.address] },
  // });

  // console.log('QoistipPriceAggregator deployed to:', qoistipPriceAggregator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
