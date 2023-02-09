/* global ethers */
/* eslint prefer-const: "off" */
import { artifacts, ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

import { FacetCutAction, getSelectors } from "./libraries/diamond";

const fileExists = async (path: string) => {
  try {
    await fs.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const saveAddress = async (address: Record<string, string>) => {
  const pathToDir = path.join(__dirname, "../", `lib`);
  const pathToFile = path.join(pathToDir, "address.json");

  if (!(await fileExists(pathToDir))) await fs.mkdir(pathToDir);

  // If file no exist
  if (!(await fileExists(pathToFile))) {
    await fs.writeFile(pathToFile, JSON.stringify({ [network.name]: address }));
    return;
  }

  // If file exist
  const data = JSON.parse(
    (await fs.readFile(pathToFile)) as unknown as string
  ) as Record<string, Record<string, string>>;

  await fs.writeFile(
    pathToFile,
    JSON.stringify(
      Object.assign(data, {
        [network.name]: { ...address, ...data[network.name] },
      })
    )
  );
};

const saveAbi = async (smartContractName: string) => {
  // Check if abi dir exists
  const pathToDir = path.join(__dirname, "../", `lib/abi`);
  if (!(await fileExists(pathToDir))) await fs.mkdir(pathToDir);

  // Get artifact
  const artifact = await artifacts.readArtifact(smartContractName);

  // Check if the abi file with the given name Smart Contract exists
  const pathToFile = path.join(pathToDir, `${artifact.contractName}.ts`);

  // Remove file if exists
  if (await fileExists(pathToFile)) await fs.rm(pathToFile);

  // Create new file and save new abi
  await fs.writeFile(
    pathToFile,
    `export const abi = ${JSON.stringify(artifact.abi)} as const;`
  );
};

async function deployDiamond() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];
  const signerAdmin = accounts[1];

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.deployed();

  // UserTokenImplementation
  const UserToken = await ethers.getContractFactory("UserToken");
  const userToken = await UserToken.deploy();
  await userToken.deployed();
  await userToken.initialize("UT", "UserToken");
  // console.log("DiamondCutFacet deployed:", diamondCutFacet.address);

  // deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(
    contractOwner.address,
    diamondCutFacet.address,
    signerAdmin.address,
    userToken.address
  );
  await diamond.deployed();
  console.log("Diamond deployed:", diamond.address);

  saveAddress({ Diamond: diamond.address });
  saveAbi("Diamond");

  // deploy DiamondInit
  const DiamondInit = await ethers.getContractFactory("DiamondInit");
  const diamondInit = await DiamondInit.deploy();
  await diamondInit.deployed();

  // deploy facets
  const FacetNames = [
    "DiamondLoupeFacet",
    "OwnershipFacet",
    "AdministrationFacet",
    "UserFacet",
  ];
  const cut = [];
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy();
    await facet.deployed();

    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });

    // Save data
    saveAddress({ [FacetName]: facet.address });
    saveAbi(FacetName);
  }

  // upgrade diamond with facets
  const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.address);
  let tx;
  let receipt;
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall);

  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }

  // save rest Smart Contract abi
  await saveAbi("IERC20");
  await saveAbi("UserToken");
  await saveAbi("UserTokenSafeGas");

  return diamond.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
export { deployDiamond };
