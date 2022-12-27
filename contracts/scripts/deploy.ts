/* global ethers */
/* eslint prefer-const: "off" */
import { ethers, network } from "hardhat";
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
  const pathToDir = path.join(__dirname, "../", `artifacts/address`);
  const pathToFile = path.join(pathToDir, `${network.name}.json`);

  if (!(await fileExists(pathToDir))) await fs.mkdir(pathToDir);

  if (!(await fileExists(pathToFile))) {
    await fs.writeFile(pathToFile, JSON.stringify(address));
    return;
  }

  const data = JSON.parse(
    (await fs.readFile(pathToFile)) as unknown as string
  ) as Record<string, string>;

  await fs.writeFile(pathToFile, JSON.stringify(Object.assign(data, address)));
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

  // deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const DiamondInit = await ethers.getContractFactory("DiamondInit");
  const diamondInit = await DiamondInit.deploy();
  await diamondInit.deployed();
  // console.log("DiamondInit deployed:", diamondInit.address);

  // deploy facets
  // console.log("");
  // console.log("Deploying facets");
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
    // console.log(`${FacetName} deployed: ${facet.address}`);
    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    });
    saveAddress({ [FacetName]: facet.address });
  }

  // upgrade diamond with facets
  // console.log("");
  // console.log("Diamond Cut:", cut);
  const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.address);
  let tx;
  let receipt;
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData("init");
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall);
  // console.log("Diamond cut tx: ", tx.hash);
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  // console.log("Completed diamond cut");
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
// exports.deployDiamond = deployDiamond
