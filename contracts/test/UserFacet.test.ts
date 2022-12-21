/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { DiamondLoupeFacet, UserFacet } from "../typechain-types";

describe("AdministrationFacet", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner;
  let signerAdmin: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let userFacet: UserFacet;
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

    userFacet = await ethers.getContractAt(
      "UserFacet",
      diamondAddress
    );

    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }
  });

  it("diamond should have UserToken implementation address", async () => {
    const flag = await userFacet.;
    assert.isFalse(flag);
  });
  
  it("the UserToken implementation should belong to Diamond", async () => {
  });
});
