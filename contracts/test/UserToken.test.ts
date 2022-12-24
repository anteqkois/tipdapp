/* global describe it before ethers */

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { UserToken } from "../typechain-types";

describe("UserToken", async function () {
  // let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;
  // let accounts: SignerWithAddress[];
  // let contractOwner: SignerWithAddress;
  // let signerAdmin: SignerWithAddress;

  // let diamondAddress: string;
  // let diamondLoupeFacet: DiamondLoupeFacet;
  // let administrationFacet: AdministrationFacet;
  // const addresses: string[] = [];
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let userToken: UserToken;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("UserToken");
    userToken = await Token.deploy();
    // accounts = await ethers.getSigners();
    // contractOwner = accounts[0];
    // signerAdmin = accounts[1];

    // diamondAddress = await deployDiamond();

    // diamondLoupeFacet = await ethers.getContractAt(
    //   "DiamondLoupeFacet",
    //   diamondAddress
    // );

    // administrationFacet = await ethers.getContractAt(
    //   "AdministrationFacet",
    //   diamondAddress
    // );

    // for (const address of await diamondLoupeFacet.facetAddresses()) {
    //   addresses.push(address);
    // }
  });
  describe("Initialize", () => {
    it("should assign all the tokens to the owner and also", async () => {
      await userToken.initialize("UT", "UserToken");

      expect(await userToken.name()).to.equal("UserToken");
      expect(await userToken.symbol()).to.equal("UT");
    });
  });

  describe("Deployment", () => {
    it("should assign all the tokens to the owner and also", async () => {
      const ownerBalance = await userToken.balanceOf(owner.address);

      expect(await userToken.totalSupply()).to.equal(ownerBalance);
    });

    it("should verify the owners address", async () => {
      expect(await userToken.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", async () => {
    it("owner can mint token", async () => {
      await expect(
        userToken.mint(owner.address, ethers.utils.parseEther("1000"))
      )
        .to.emit(userToken, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          owner.address,
          ethers.utils.parseEther("1000")
        );
    });

    it("totalSupplt should change", async () => {
      expect(await userToken.totalSupply()).to.be.equal(
        ethers.utils.parseEther("1000")
      );
    });

    it("anybody else ban not mint token", async () => {
      await expect(
        userToken
          .connect(addr1)
          .mint(owner.address, ethers.utils.parseEther("1000"))
      ).to.revertedWith("Only owner");
    });
  });

  describe("Burn", async () => {
    it("anybody can burn token", async () => {
      await expect(userToken.burn(ethers.utils.parseEther("10")))
        .to.emit(userToken, "Transfer")
        .withArgs(
          owner.address,
          ethers.constants.AddressZero,
          ethers.utils.parseEther("10")
        );
    });
    it("totalSupplt should change", async () => {
      expect(await userToken.totalSupply()).to.be.equal(
        ethers.utils.parseEther("990")
      );
    });
  });

  describe("Ownership", async () => {
    it("owne can transfer ownership", async () => {
      expect(await userToken.owner()).to.be.equal(owner.address);

      await userToken.changeOwner(addr1.address);

      expect(await userToken.owner()).to.be.equal(addr1.address);
    });

    it("owne can not be zero address", async () => {
      await expect(
        userToken.connect(addr1).changeOwner(ethers.constants.AddressZero)
      ).to.be.revertedWith("New owner is zero address");
    });

    it("ownership return to previous owner", async () => {
      await userToken.connect(addr1).changeOwner(owner.address);

      expect(await userToken.owner()).to.be.equal(owner.address);
    });
  });

  describe("Transfer", () => {
    it("test if the balance is sufficient", async () => {
      await expect(
        userToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Amount exceeds balance");
    });

    it("test if the balances of sender and receiver is valid", async () => {
      const ownerInitialBalance = await userToken.balanceOf(owner.address);
      await expect(
        userToken
          .connect(owner)
          .transfer(addr1.address, ethers.utils.parseEther("10"))
      )
        .to.emit(userToken, "Transfer")
        .withArgs(owner.address, addr1.address, ethers.utils.parseEther("10"))
        .to.changeTokenBalances(
          userToken,
          [owner, addr1],
          [ethers.utils.parseEther("-10"), ethers.utils.parseEther("10")]
        );
    });
  });

  describe("Approve", () => {
    xit("test if if the approved is allowed for low balances", async () => {
      await expect(
        userToken
          .connect(owner)
          .approve(addr1.address, ethers.utils.parseEther("1000"))
      ).to.be.revertedWith("Not enough balance in sender account");
    });

    it("test if if the spender is approved", async () => {
      await expect(
        userToken
          .connect(owner)
          .approve(addr1.address, ethers.utils.parseEther("1"))
      )
        .to.emit(userToken, "Approval")
        .withArgs(owner.address, addr1.address, ethers.utils.parseEther("1"));

      expect(
        await userToken.allowance(owner.address, addr1.address)
      ).to.be.equal(ethers.utils.parseEther("1"));
    });
  });

  // describe("Transfer from", () => {
  //   it("Test not enough balance", async () => {
  //     await expect(
  //       userToken
  //         .connect(addr1)
  //         .transferFrom(owner.address, addr2.address, 10000000)
  //     ).to.be.revertedWith("Not enough balance in sender account");
  //   });

  //   it("Test not not allowed", async () => {
  //     await expect(
  //       userToken.connect(addr1).transferFrom(owner.address, addr2.address, 50)
  //     ).to.be.revertedWith("Required amount not allowed");
  //   });

  //   it("Test transfer-from", async () => {
  //     await expect(userToken.connect(owner).approve(addr1.address, 50));
  //     const initialAllowance = await userToken.allowance(
  //       owner.address,
  //       addr1.address
  //     );
  //     const ownerInitialBalance = await userToken.balanceOf(owner.address);
  //     const addr2InitialBalance = await userToken.balanceOf(addr2.address);
  //     await userToken
  //       .connect(addr1)
  //       .transferFrom(owner.address, addr2.address, 5);

  //     expect(
  //       await userToken.allowance(owner.address, addr1.address)
  //     ).to.be.equal(initialAllowance - 5);
  //     expect(await userToken.balanceOf(owner.address)).to.be.equal(
  //       ownerInitialBalance - 5
  //     );
  //     expect(await userToken.balanceOf(addr2.address)).to.be.equal(
  //       addr2InitialBalance + 5
  //     );
  //   });
  // });
});
