/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20_TOKEN_ADDRESS, HOLDER_ADDRESS } from "../constants";
import { packDataToSign } from "../helpers/mockPackAndSign";
import {
  DiamondLoupeFacet,
  IERC20,
  UserFacet,
  UserToken,
} from "../typechain-types";

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

  let userToken: UserToken;
  let sand: IERC20;
  let sandHodler: SignerWithAddress;

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

    sand = await ethers.getContractAt("IERC20", ERC20_TOKEN_ADDRESS.SAND);
    sandHodler = await ethers.getImpersonatedSigner(HOLDER_ADDRESS.SAND_HOLDER);
  });

  describe("Register", async () => {
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

  describe("Donate ERC20", async () => {
    it("user $SAND balance before donate should be 0", async function () {
      expect(
        await userFacet.balanceERC20(userOne.address, sand.address)
      ).to.equal(0);
    });
    it("Send $SAND donate, check balance before and after", async function () {
      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      // check on frontend signature from backend
      // const hash = await ethers.utils.keccak256(ethAddress);
      // const sig = await signer.signMessage(ethers.utils.arrayify(hash));
      // const pk = ethers.utils.recoverPublicKey(hash, sig);

      const { signature, signatureData } = await packDataToSign({
        tokenAmount: "100.25",
        addressToDonate: userOne.address,
        tokenQuote: "SAND",
        userTokenAddress: userToken.address,
      });

      await expect(
        userFacet
          .connect(sandHodler)
          .donateERC20(
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
        .to.emit(userFacet, "Donate")
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

      // const donateTx = userFacet
      //   .connect(sandHodler)
      //   .donateERC20(
      //     signature,
      //     signatureData.tokenAmountBN,
      //     signatureData.amountToMint,
      //     signatureData.tokenToUser,
      //     signatureData.fee,
      //     signatureData.timestamp,
      //     userOne.address,
      //     signatureData.tokenAddress,
      //     signatureData.userTokenAddress
      //   );

      // await expect(donateTx)
      //   .to.emit(userFacet, "Donate")
      //   .withArgs(
      //     sandHodler.address,
      //     userOne.address,
      //     ERC20_TOKEN_ADDRESS.SAND,
      //     ethers.utils.parseEther("100.25")
      //   );

      // await expect(donateTx).to.changeTokenBalances(
      //   ERC20_TOKEN_ADDRESS.SAND,
      //   [sandHodler, userOne],
      //   ["-100.25", "100.25"]
      // );
    });
    // it("Check $SAND balance after donate", async function () {
    //   expect(
    //     await qoistipSign.balanceERC20(user1.address, sand.address)
    //   ).to.equal(parseUnits("97"));
    //   expect(
    //     await qoistipSign.balanceERC20(qoistipSign.address, sand.address)
    //   ).to.equal(parseUnits("100").sub(parseUnits("97")));
    //   expect(await sand.balanceOf(qoistipSign.address)).to.equal(
    //     parseUnits("100")
    //   );
    // });
    // it("Check $UT1 balance after donate", async function () {
    //   const calculateExpectBalance = parseUnits("100")
    //     .mul(sandPriceBN)
    //     .div("1000000000000000000");
    //   expect(await userToken1.balanceOf(sandHodler.address)).to.equal(
    //     calculateExpectBalance
    //   );
    // });
    // it("Check $SHIB balance before donate", async function () {
    //   expect(
    //     await qoistipSign.balanceERC20(user1.address, shib.address)
    //   ).to.equal(0);
    // });
    // it("Send donate in $SHIB and check changeTokenBalance function", async function () {
    //   await shib
    //     .connect(shibHodler)
    //     .approve(qoistipSign.address, parseUnits("10000"));

    //   const { signature, signatureData } = await packDataToSign(
    //     "10000",
    //     "SHIB",
    //     user1.address,
    //     userToken1.address
    //   );

    //   await expect(() =>
    //     qoistipSign
    //       .connect(shibHodler)
    //       .donateERC20(
    //         signature,
    //         signatureData.tokenAmountBN,
    //         signatureData.amountToMint,
    //         signatureData.tokenToUser,
    //         signatureData.fee,
    //         signatureData.timestamp,
    //         user1.address,
    //         signatureData.tokenAddress,
    //         signatureData.userTokenAddress
    //       )
    //   ).to.changeTokenBalances(
    //     shib,
    //     [shibHodler, qoistipSign],
    //     [parseUnits("-10000"), parseUnits("10000")]
    //   );
    // });
    // it("Check $SHIB balance after donate", async function () {
    //   expect(
    //     await qoistipSign.balanceERC20(user1.address, shib.address)
    //   ).to.equal(parseUnits("9700"));
    //   expect(
    //     await qoistipSign.balanceERC20(qoistipSign.address, shib.address)
    //   ).to.equal(parseUnits("10000").sub(parseUnits("9700")));
    //   expect(await shib.balanceOf(qoistipSign.address)).to.equal(
    //     parseUnits("10000")
    //   );
    // });
    // it("Check $UT1 balance after donate", async function () {
    //   const calculateExpectBalance = parseUnits("10000")
    //     .mul(shibPriceBN)
    //     .div("1000000000000000000");
    //   expect(await userToken1.balanceOf(shibHodler.address)).to.equal(
    //     calculateExpectBalance
    //   );
    // });
    // it("Can not send donate if worth is to small ($SAND)", async function () {
    //   await sand
    //     .connect(sandHodler)
    //     .approve(qoistipSign.address, parseUnits("0.01"));

    //   await expect(
    //     packDataToSign("0.01", "SAND", user1.address, userToken1.address)
    //   ).to.eventually.be.rejectedWith(Error);
    // });
    // it("Revert when smart contract locked", async function () {
    //   await sand
    //     .connect(sandHodler)
    //     .approve(qoistipSign.address, parseUnits("100"));

    //   expect(await qoistipSign.paused()).to.be.false;
    //   await expect(qoistipSign.connect(shibHodler).pause()).to.be.revertedWith(
    //     "Only owner"
    //   );
    //   await qoistipSign.pause();
    //   expect(await qoistipSign.paused()).to.be.true;

    //   const { signature, signatureData } = await packDataToSign(
    //     "100",
    //     "SAND",
    //     user1.address,
    //     userToken1.address
    //   );

    //   await expect(
    //     qoistipSign
    //       .connect(sandHodler)
    //       .donateERC20(
    //         signature,
    //         signatureData.tokenAmountBN,
    //         signatureData.amountToMint,
    //         signatureData.tokenToUser,
    //         signatureData.fee,
    //         signatureData.timestamp,
    //         user1.address,
    //         signatureData.tokenAddress,
    //         signatureData.userTokenAddress
    //       )
    //   ).to.be.revertedWith("Smart Contract paused");

    //   await qoistipSign.unPause();

    //   qoistipSign
    //     .connect(sandHodler)
    //     .donateERC20(
    //       signature,
    //       signatureData.tokenAmountBN,
    //       signatureData.amountToMint,
    //       signatureData.tokenToUser,
    //       signatureData.fee,
    //       signatureData.timestamp,
    //       user1.address,
    //       signatureData.tokenAddress,
    //       signatureData.userTokenAddress
    //     );
    // });
    // it("Revert when address to donate is 0x0...", async function () {
    //   await sand
    //     .connect(sandHodler)
    //     .approve(qoistipSign.address, parseUnits("100"));

    //   await expect(
    //     packDataToSign(
    //       "1",
    //       "SAND",
    //       ethers.constants.AddressZero,
    //       userToken1.address
    //     )
    //   ).to.eventually.be.rejectedWith(Error);
    // });
    // xit("Revert when address not register (handle with db)", async function () {
    //   await sand
    //     .connect(sandHodler)
    //     .approve(qoistipSign.address, parseUnits("100"));

    //   await expect(
    //     qoistipSign
    //       .connect(sandHodler)
    //       .donateERC20(adminSigner.address, sand.address, parseUnits("100"))
    //   ).to.be.reverted;
    // });
  });
});
