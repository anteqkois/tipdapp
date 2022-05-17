const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const { signer, provider } = require('../server/ethersProvider');

const saveDataToFrontend = async (tokenAddr, contractName) => {
  const contractsDir = path.join(__dirname, '..', '/src/artifacts');

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${contractName}-address.json`,
    JSON.stringify(
      {
        tokenAddress: tokenAddr,
      },
      undefined,
      2,
    ),
  );

  const TokenArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(contractsDir + `/${contractName}.json`, JSON.stringify(TokenArtifact, null, 2));
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const QoistipSign = await hre.ethers.getContractFactory('QoistipSign');
  const qoistipSign = await hre.upgrades.deployProxy(QoistipSign, [signer.address], { kind: 'uups' });
  await qoistipSign.deployed();

  console.log('Qoistip deployed to:', qoistipSign.address);

  saveDataToFrontend(qoistipSign.address, 'Qoistip');

  // harhat 0xaB7B4c595d3cE8C85e16DA86630f2fc223B05057
  // localhost 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

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
