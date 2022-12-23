/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { AdministrationFacet, DiamondLoupeFacet } from "../typechain-types";

describe("UserToken", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner: SignerWithAddress;
  let signerAdmin: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let administrationFacet: AdministrationFacet;
  const addresses: string[] = [];

  before(async function () {
    accounts = await ethers.getSigners();
    contractOwner = accounts[0];
    signerAdmin = accounts[1];

    diamondAddress = await deployDiamond();

    diamondLoupeFacet = await ethers.getContractAt(
      "DiamondLoupeFacet",
      diamondAddress
    );

    administrationFacet = await ethers.getContractAt(
      "AdministrationFacet",
      diamondAddress
    );

    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }
  });

  describe("Pausable", async function () {});
});
