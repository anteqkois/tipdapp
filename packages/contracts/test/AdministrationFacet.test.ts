/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { ERC20_TOKEN_ADDRESS, HOLDER_ADDRESS } from "../constants";
import { calculateFee } from "../helpers/calculateFee";
import { packDataToSign } from "../helpers/mockPackAndSign";
import {
  AdministrationFacet,
  DiamondLoupeFacet,
  IERC20,
  OwnershipFacet,
  UserFacet,
  UserToken,
} from "../typechain-types";

describe("AdministrationFacet", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  let accounts: SignerWithAddress[];
  let contractOwner: SignerWithAddress;
  let signerAdmin: SignerWithAddress;
  let userOne: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let administrationFacet: AdministrationFacet;
  let ownershipFacet: OwnershipFacet;
  let userFacet: UserFacet;
  let userToken: UserToken;

  const addresses: string[] = [];

  let sand: IERC20;
  let sandHodler: SignerWithAddress;
  let shiba: IERC20;
  let shibaHodler: SignerWithAddress;

  before(async function () {
    accounts = await ethers.getSigners();
    contractOwner = accounts[0];
    signerAdmin = accounts[1];
    userOne = accounts[2];

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

    userFacet = await ethers.getContractAt("UserFacet", diamondAddress);

    sand = await ethers.getContractAt("IERC20", ERC20_TOKEN_ADDRESS.SAND);
    sandHodler = await ethers.getImpersonatedSigner(HOLDER_ADDRESS.SAND_HOLDER);
    shiba = await ethers.getContractAt("IERC20", ERC20_TOKEN_ADDRESS.SHIB);
    shibaHodler = sandHodler;

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

  describe("Withdraw admin ERC20", async () => {
    // Register user and send ERC20 tip
    it("user can register and send ERC20 tip", async () => {
      await userFacet.connect(userOne).registerUser("ANQ", "AnteqToken");
      const userTokenAddress = await userFacet.userToken(userOne.address);

      userToken = await ethers.getContractAt("UserToken", userTokenAddress);

      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      const { signature, signatureData } = await packDataToSign({
        tokenAmountInEther: "100.25",
        addressToTip: userOne.address,
        tokenQuote: "SAND",
        userTokenAddress: userToken.address,
      });

      await expect(
        userFacet
          .connect(sandHodler)
          .tipERC20(
            signature,
            signatureData.tokenAmountBN,
            signatureData.amountToMint,
            signatureData.tokenToUser,
            signatureData.fee,
            signatureData.timestamp,
            userOne.address,
            signatureData.tokenAddress,
            signatureData.userTokenAddress
          )
      )
        .to.emit(userFacet, "Tip")
        .withArgs(
          sandHodler.address,
          userOne.address,
          ERC20_TOKEN_ADDRESS.SAND,
          ethers.utils.parseEther("100.25")
        )
        .to.changeTokenBalances(
          sand,
          [sandHodler, diamondAddress, userOne],
          [
            ethers.utils.parseEther("-100.25"),
            ethers.utils.parseEther("100.25"),
            0,
          ]
        );
    });

    it("admin can withdraw one ERC20 token", async () => {
      const balance = await userFacet.balanceERC20(
        diamondAddress,
        ERC20_TOKEN_ADDRESS.SAND
      );

      expect(balance).to.be.equal(
        calculateFee(ethers.utils.parseEther("100.25"))
      );

      await expect(
        administrationFacet.withdrawERC20Admin(ERC20_TOKEN_ADDRESS.SAND)
      )
        .to.emit(userFacet, "Withdraw")
        .withArgs(contractOwner.address, ERC20_TOKEN_ADDRESS.SAND, balance)
        .to.changeTokenBalances(
          sand,
          [contractOwner, diamondAddress],
          [balance, balance.mul("-1")]
        );
    });

    it("admin balance in diamond should be zero", async () => {
      expect(
        await userFacet.balanceERC20(diamondAddress, ERC20_TOKEN_ADDRESS.SAND)
      ).to.be.equal(0);
    });

    it("admin can withdraw many ERC20 token", async () => {
      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      const { signature, signatureData } = await packDataToSign({
        tokenAmountInEther: "100.25",
        addressToTip: userOne.address,
        tokenQuote: "SAND",
        userTokenAddress: userToken.address,
      });

      await userFacet
        .connect(sandHodler)
        .tipERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          userOne.address,
          signatureData.tokenAddress,
          signatureData.userTokenAddress
        );

      await shiba
        .connect(shibaHodler)
        .approve(diamondAddress, ethers.utils.parseEther("101010"));

      const packedData = await packDataToSign({
        tokenAmountInEther: "101010",
        addressToTip: userOne.address,
        tokenQuote: "SHIB",
        userTokenAddress: userToken.address,
      });

      await userFacet
        .connect(sandHodler)
        .tipERC20(
          packedData.signature,
          packedData.signatureData.tokenAmountBN,
          packedData.signatureData.amountToMint,
          packedData.signatureData.tokenToUser,
          packedData.signatureData.fee,
          packedData.signatureData.timestamp,
          userOne.address,
          packedData.signatureData.tokenAddress,
          packedData.signatureData.userTokenAddress
        );

      const balanceSand = await userFacet.balanceERC20(
        diamondAddress,
        ERC20_TOKEN_ADDRESS.SAND
      );
      const balanceShiba = await userFacet.balanceERC20(
        diamondAddress,
        ERC20_TOKEN_ADDRESS.SHIB
      );

      const expectedBalanceShiba = calculateFee(
        ethers.utils.parseEther("101010")
      );

      expect(balanceSand).to.be.equal(
        calculateFee(ethers.utils.parseEther("100.25"))
      );
      expect(balanceShiba).to.be.equal(expectedBalanceShiba);

      await expect(
        administrationFacet.withdrawManyERC20Admin([
          ERC20_TOKEN_ADDRESS.SAND,
          ERC20_TOKEN_ADDRESS.SHIB,
        ])
      )
        .to.emit(userFacet, "Withdraw")
        .withArgs(contractOwner.address, ERC20_TOKEN_ADDRESS.SAND, balanceSand)
        .to.emit(userFacet, "Withdraw")
        .withArgs(contractOwner.address, ERC20_TOKEN_ADDRESS.SHIB, balanceShiba)
        .to.changeTokenBalances(
          sand,
          [contractOwner, diamondAddress],
          [balanceSand, balanceSand.mul("-1")]
        )
        .to.changeTokenBalances(
          shiba,
          [contractOwner, diamondAddress],
          [balanceShiba, balanceShiba.mul("-1")]
        );
    });

    it("admin balance in diamond should be zero", async () => {
      expect(
        await userFacet.balanceERC20(diamondAddress, ERC20_TOKEN_ADDRESS.SAND)
      ).to.be.equal(0);
      expect(
        await userFacet.balanceERC20(diamondAddress, ERC20_TOKEN_ADDRESS.SHIB)
      ).to.be.equal(0);
    });
  });

  describe("Withdraw admin ETH", async () => {
    it("admin can withdraw ETH", async () => {
      await userFacet
        .connect(sandHodler)
        .tipETH(userOne.address, { value: ethers.utils.parseEther("1") });

      const balance = await userFacet.balanceETH(diamondAddress);

      expect(balance).to.be.closeTo(
        calculateFee(ethers.utils.parseEther("1")),
        1
      );

      await expect(administrationFacet.withdrawETHAdmin())
        .to.emit(userFacet, "Withdraw")
        .withArgs(contractOwner.address, ethers.constants.AddressZero, balance)
        .to.changeEtherBalances(
          [contractOwner.address, diamondAddress],
          [balance, balance.mul("-1")]
        );
    });

    it("admin balance in diamond should be zero", async () => {
      expect(await userFacet.balanceETH(diamondAddress)).to.be.equal(0);
    });
  });
});
