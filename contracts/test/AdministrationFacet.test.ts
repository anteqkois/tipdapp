/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import {
  AdministrationFacet,
  DiamondLoupeFacet,
  OwnershipFacet,
} from "../typechain-types";

describe("AdministrationFacet", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner;
  let signerAdmin: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let administrationFacet: AdministrationFacet;
  let ownershipFacet: OwnershipFacet;
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

    ownershipFacet = await ethers.getContractAt(
      "OwnershipFacet",
      diamondAddress
    );

    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }
  });

  describe("Pausable", async function () {
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
  });

  describe("Signer address", async function () {
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
  });

  describe("Fee", async function () {
    it("tip fee should be properly assigned", async () => {
      expect(await administrationFacet.tipFee()).to.be.equal(300);
    });

    it("tip fee can be change", async () => {
      await administrationFacet.setFee("500");
      expect(await administrationFacet.tipFee()).to.be.equal(500);

      await administrationFacet.setFee("300");
      expect(await administrationFacet.tipFee()).to.be.equal(300);
    });
  });

  describe("UserToken factory", async function () {
    it("diamond should have UserToken implementation address", async () => {
      const implementationAddress =
        await administrationFacet.userTokenImplmentation();
      expect(implementationAddress).to.exist;
    });

    it("the UserToken implementation (master smart contract) should belong to Diamond owner", async () => {
      const implementationAddress =
        await administrationFacet.userTokenImplmentation();

      const userTokenMaster = await ethers.getContractAt(
        "UserToken",
        implementationAddress
      );

      const diamondOwner = await ownershipFacet.owner();

      expect(await userTokenMaster.owner()).to.be.equal(diamondOwner);
    });

    it("owner can change userTokenImplementation address", async () => {
      await administrationFacet.setUserTokenImplmentation(accounts[2].address);

      const implementationAddress =
        await administrationFacet.userTokenImplmentation();
      expect(implementationAddress).to.be.equal(accounts[2].address);
    });
  });

  describe("Withdraw admin ERC20", async ()=>{})
  describe("Withdraw admin ETH", async ()=>{})
});
