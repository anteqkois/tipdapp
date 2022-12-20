/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { AdministrationFacet, DiamondLoupeFacet } from "../typechain-types";

describe("AdministrationFacet", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner;
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

  it("should pausable flag be false", async () => {
    const flag = await administrationFacet.paused();
    assert.isFalse(flag);
  });

  it("only owner can change paused veriable", async () => {
    await expect(
      administrationFacet.connect(accounts[1]).pause()
    ).to.be.revertedWith("LibDiamond: Must be contract owner");
  });

  it("owner can change paused veriable", async () => {
    await administrationFacet.pause();
    expect(await administrationFacet.paused()).to.be.true;

    await administrationFacet.unPause();
    expect(await administrationFacet.paused()).to.be.false;
  });

  xit("function should not be execute when smart contract is paused", async () => {});

  it("signer wallet address should be properly assigned", async () => {
    expect(await administrationFacet.signerAdmin()).to.be.equal(
      accounts[1].address
    );
  });

  it("owne can change signer address", async () => {
    await administrationFacet.changeSignerAdmin(accounts[2].address);
    expect(await administrationFacet.signerAdmin()).to.be.equal(
      accounts[2].address
    );

    await administrationFacet.changeSignerAdmin(signerAdmin.address);
    expect(await administrationFacet.signerAdmin()).to.be.equal(
      signerAdmin.address
    );
  });

  it("donate fee should be properly assigned", async () => {
    expect(await administrationFacet.donateFee()).to.be.equal(300);
  });

  it("donate fee can be change", async () => {
    await administrationFacet.setFee('500')
    expect(await administrationFacet.donateFee()).to.be.equal(500);
    
    await administrationFacet.setFee('300')
    expect(await administrationFacet.donateFee()).to.be.equal(300);
  });
});
