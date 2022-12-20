/* global describe it before ethers */

import { getSelectors } from "../scripts/libraries/diamond";

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { assert } from "chai";
import { ethers } from "hardhat";
import {
  DiamondCutFacet,
  DiamondLoupeFacet,
  OwnershipFacet,
  PausableFacet,
} from "../typechain-types";

describe("DiamondTest", async function () {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  let diamondAddress: string;
  let diamondCutFacet: DiamondCutFacet;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let ownershipFacet: OwnershipFacet;
  let pausableFacet: PausableFacet;
  let tx;
  let receipt;
  let result;
  const addresses: string[] = [];

  before(async function () {
    diamondAddress = await deployDiamond();
    diamondCutFacet = await ethers.getContractAt(
      "DiamondCutFacet",
      diamondAddress
    );
    diamondLoupeFacet = await ethers.getContractAt(
      "DiamondLoupeFacet",
      diamondAddress
    );
    ownershipFacet = await ethers.getContractAt(
      "OwnershipFacet",
      diamondAddress
    );
    pausableFacet = await ethers.getContractAt("PausableFacet", diamondAddress);
  });

  it("should have three facets -- call to facetAddresses function", async () => {
    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }

    assert.isAbove(addresses.length, 3);
  });

  it("facets should have the right function selectors -- call to facetFunctionSelectors function", async () => {
    let selectors = getSelectors(diamondCutFacet);
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[0]);
    assert.sameMembers(result, selectors);
    selectors = getSelectors(diamondLoupeFacet);
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[1]);
    assert.sameMembers(result, selectors);
    selectors = getSelectors(ownershipFacet);
    result = await diamondLoupeFacet.facetFunctionSelectors(addresses[2]);
    assert.sameMembers(result, selectors);
  });

  it("selectors should be associated to facets correctly -- multiple calls to facetAddress function", async () => {
    assert.equal(
      addresses[0],
      await diamondLoupeFacet.facetAddress("0x1f931c1c")
    );
    assert.equal(
      addresses[1],
      await diamondLoupeFacet.facetAddress("0xcdffacc6")
    );
    assert.equal(
      addresses[1],
      await diamondLoupeFacet.facetAddress("0x01ffc9a7")
    );
    assert.equal(
      addresses[2],
      await diamondLoupeFacet.facetAddress("0xf2fde38b")
    );
  });

  it("should pausable flag be false", async () => {
    const flag = await pausableFacet.paused();
    assert.isFalse(flag);
  });

  // it("only owner can change paused veriable", async () => {
  //   await expect(pausableFacet.connect(accounts[1]).pause()).to.be.revertedWith(
  //     "Unlock time should be in the future"
  //   );
  //   // const flag = await pausableFacet.paused();
  //   // assert.isFalse(flag);
  // });
});
