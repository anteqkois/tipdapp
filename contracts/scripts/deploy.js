const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
// const ethernal = require('hardhat-ethernal');
// const { signerAdmin, provider } = require('../utils/ethersProvider');

const createIfNotExsist = async (dir) => {
  !fs.existsSync(dir) && fs.mkdirSync(dir);
};

const saveToService = async (tokenAddr, contractName, txDeploy, TokenArtifact, folderPath) => {
  const serviceArtifactsDir = path.join(__dirname, '../..', folderPath);
  const serviceNetworkDir = path.join(serviceArtifactsDir, hre.network.name);

  await createIfNotExsist(serviceArtifactsDir);
  await createIfNotExsist(serviceNetworkDir);

  fs.writeFileSync(
    `${serviceNetworkDir}/${contractName}-txDeploy.json`,
    JSON.stringify(
      {
        txDeploy,
      },
      undefined,
      2,
    ),
  );

  fs.writeFileSync(
    `${serviceNetworkDir}/${contractName}.json`,
    JSON.stringify({ address: tokenAddr, abi: TokenArtifact.abi }, null, 2),
  );
};

const servicesPath = ['/server/artifacts/', '/dapp/src/artifacts/', '/blockchainListeners/artifacts/'];

const saveDataToServices = async (tokenAddr, contractName, txDeploy) => {
  const TokenArtifact = artifacts.readArtifactSync(contractName);
  servicesPath.forEach((folderPath) => saveToService(tokenAddr, contractName, txDeploy, TokenArtifact, folderPath));
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

  await saveDataToServices(qoistipSign.address, 'QoistipSign', tx.deployTransaction);

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
