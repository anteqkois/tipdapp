/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DiamondLoupeFacet, UserFacet, UserToken } from "../typechain-types";

describe("AdministrationFacet", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner;
  let signerAdmin: SignerWithAddress;
  let userOne: SignerWithAddress;
  let diamondAsSigner: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let userFacet: UserFacet;
  const addresses: string[] = [];

  before(async function () {
    accounts = await ethers.getSigners();
    contractOwner = accounts[0];
    signerAdmin = accounts[1];
    userOne = accounts[2];

    diamondAddress = await deployDiamond();
    diamondAsSigner = await ethers.getImpersonatedSigner(diamondAddress);

    await contractOwner.sendTransaction({
      to: diamondAsSigner.address,
      value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
    });

    diamondLoupeFacet = await ethers.getContractAt(
      "DiamondLoupeFacet",
      diamondAddress
    );

    userFacet = await ethers.getContractAt("UserFacet", diamondAddress);

    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }
  });

  describe("Register", async () => {
    let userToken: UserToken;

    it("user can register, their token was created and should emit event NewUser", async () => {
      const registerUserTx = await userFacet
        .connect(userOne)
        .registerUser("ANQ", "AnteqToken");
      registerUserTx.wait();
      const userTokenAddress = await userFacet.userToken(userOne.address);

      await expect(registerUserTx)
        .to.emit(userFacet, "NewUser")
        .withArgs(userOne.address, userTokenAddress);

      userToken = await ethers.getContractAt("UserToken", userTokenAddress);
    });

    it("initialize function can not be call again", async () => {
      await expect(userToken.initialize("QQQ", "QToken")).to.be.revertedWith(
        "Contract is already initialized"
      );
    });

    it("user token should be properly assigned to their address", async () => {
      expect(await userFacet.userToken(userOne.address)).to.be.equal(
        userToken.address
      );
    });

    it("user token have right details data", async () => {
      expect(await userToken.symbol()).to.be.equal("ANQ");
      expect(await userToken.name()).to.be.equal("AnteqToken");
      expect(await userToken.decimals()).to.be.equal(18);
      expect(await userToken.totalSupply()).to.be.equal(0);
    });

    it("user token belongs to Diamond", async () => {
      expect(await userToken.owner()).to.be.equal(diamondAddress);
    });

    it("user ETH balance shold be 0 after registered", async () => {
      expect(await userFacet.balanceETH(userOne.address)).to.be.equal(0);
    });

    it("only Diamond can mint token", async () => {
      await expect(
        userToken
          .connect(userOne)
          .mint(userOne.address, ethers.utils.parseEther("1"))
      ).to.be.revertedWith("Only owner");

      expect(await userToken.balanceOf(userOne.address)).to.be.equal(0);

      await expect(
        userToken
          .connect(diamondAsSigner)
          .mint(userOne.address, ethers.utils.parseEther("1"))
      )
        .to.emit(userToken, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          userOne.address,
          ethers.utils.parseEther("1")
        );

      expect(await userToken.balanceOf(userOne.address)).to.be.equal(
        ethers.utils.parseEther("1")
      );
    });

    it("token can be burned", async () => {
      await expect(
        userToken
          .connect(userOne)
          .burn(ethers.utils.parseEther("1.000000000000000001"))
      ).to.be.revertedWith("Burn amount exceeds balance");
      // console.log(await userToken.balanceOf(userOne.address));
      // console.log(ethers.utils.parseEther("1"));

      await expect(
        userToken.connect(userOne).burn(ethers.utils.parseEther("1"))
      )
        .to.emit(userToken, "Transfer")
        .withArgs(
          userOne.address,
          ethers.constants.AddressZero,
          ethers.utils.parseEther("1")
        );

      expect(await userToken.balanceOf(userOne.address)).to.be.equal(0);
    });

    it("only Diamond can change owner", async () => {
      await expect(
        userToken.connect(userOne).changeOwner(userOne.address)
      ).to.be.revertedWith("Only owner");

      userToken.connect(diamondAsSigner).changeOwner(userOne.address);
      expect(await userToken.owner()).to.be.equal(userOne.address);

      userToken.connect(userOne).changeOwner(diamondAddress);
      expect(await userToken.owner()).to.be.equal(diamondAddress);
    });
  });
});
