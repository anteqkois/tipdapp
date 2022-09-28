const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
// const ethernal = require('hardhat-ethernal');
// const { signerAdmin, provider } = require('../utils/ethersProvider');

const saveDataToFrontend = async (tokenAddr, contractName, txDeploy) => {
  const contractsDir = path.join(__dirname, '../..', '/src/artifacts');
  const networkDir = path.join(__dirname, '../..', '/src/artifacts/', hre.network.name);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  if (!fs.existsSync(networkDir)) {
    fs.mkdirSync(networkDir);
  }

  fs.writeFileSync(
    `${networkDir}/${contractName}-txDeploy.json`,
    JSON.stringify(
      {
        txDeploy,
      },
      undefined,
      2,
    ),
  );

  const TokenArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    `${networkDir}/${contractName}.json`,
    JSON.stringify({ address: tokenAddr, abi: TokenArtifact.abi }, null, 2),
  );
};

async function main() {
  const [deployer, signerAdmin] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const QoistipSign = await hre.ethers.getContractFactory('QoistipSign');
  const qoistipSign = await hre.upgrades.deployProxy(QoistipSign, [signerAdmin.address], { kind: 'uups' });
  const tx = await qoistipSign.deployed();

  await hre.ethernal.push({
    name: 'QoistipSign',
    address: qoistipSign.address,
  });

  console.log('Qoistip deployed to:', qoistipSign.address, 'on network: ', hre.network.name);

  saveDataToFrontend(qoistipSign.address, 'QoistipSign', tx.deployTransaction);

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
