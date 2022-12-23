/* global describe it before ethers */

// const { deployDiamond } = require('../scripts/deploy')
import { deployDiamond } from "../scripts/deploy";

// const { assert } = require('chai')
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import {
  CHAILINK_PRICE_ORACLE_ADDRESS_USD,
  ERC20_TOKEN_ADDRESS,
  ERC20_TOKEN_PRICE,
  HOLDER_ADDRESS,
} from "../constants";
import { calculateFee } from "../helpers/calculateFee";
import { packDataToSign } from "../helpers/mockPackAndSign";
import {
  AdministrationFacet,
  ChailinkPriceFeeds,
  DiamondLoupeFacet,
  IERC20,
  UserFacet,
  UserToken,
} from "../typechain-types";

describe("UserFacet", async function () {
  let accounts: SignerWithAddress[];
  let contractOwner;
  let signerAdmin: SignerWithAddress;
  let userOne: SignerWithAddress;
  let diamondAsSigner: SignerWithAddress;

  let diamondAddress: string;
  let diamondLoupeFacet: DiamondLoupeFacet;
  let userFacet: UserFacet;
  let administrationFacet: AdministrationFacet;
  let chailinkPriceFeeds: ChailinkPriceFeeds;
  const addresses: string[] = [];

  let userToken: UserToken;
  let sand: IERC20;
  let sandHodler: SignerWithAddress;
  let shiba: IERC20;
  let shibaHodler: SignerWithAddress;

  let userTokenBalanceAfterTips: typeof ethers.BigNumber.prototype;

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

    administrationFacet = await ethers.getContractAt(
      "AdministrationFacet",
      diamondAddress
    );

    const ChailinkPriceFeeds = await ethers.getContractFactory(
      "ChailinkPriceFeeds"
    );
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();

    for (const address of await diamondLoupeFacet.facetAddresses()) {
      addresses.push(address);
    }

    sand = await ethers.getContractAt("IERC20", ERC20_TOKEN_ADDRESS.SAND);
    sandHodler = await ethers.getImpersonatedSigner(HOLDER_ADDRESS.SAND_HOLDER);
    shiba = await ethers.getContractAt("IERC20", ERC20_TOKEN_ADDRESS.SHIB);
    shibaHodler = sandHodler;
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

  describe("Calculate fee", () => {
    it("when number is indivisible (3% fee)", () => {
      const baseNumber = ethers.BigNumber.from("1010");
      const fee = calculateFee(baseNumber);
      const toUser = baseNumber.sub(fee);
      expect(fee).to.be.equal(ethers.BigNumber.from("31"));
      expect(toUser).to.be.equal(ethers.BigNumber.from("979"));
      expect(fee.add(toUser)).to.be.equal(baseNumber);

      const baseNumberTwo = ethers.BigNumber.from("101");
      const feeTwo = calculateFee(baseNumberTwo);
      const toUserTwo = baseNumberTwo.sub(feeTwo);
      expect(feeTwo).to.be.equal(ethers.BigNumber.from("4"));
      expect(toUserTwo).to.be.equal(ethers.BigNumber.from("97"));
      expect(feeTwo.add(toUserTwo)).to.be.equal(baseNumberTwo);
    });

    it("when number is divisible (3% fee)", () => {
      const baseNumber = ethers.BigNumber.from("100");
      const fee = calculateFee(baseNumber);
      const toUser = baseNumber.sub(fee);

      expect(fee).to.be.equal(ethers.BigNumber.from("3"));
      expect(toUser).to.be.equal(ethers.BigNumber.from("97"));
      expect(fee.add(toUser)).to.be.equal(baseNumber);
    });

    it("when number is indivisible and large (3% fee)", () => {
      // 101.000000000000001010 $ETH
      const baseNumber = ethers.utils
        .parseEther("101")
        .add(ethers.utils.parseUnits("1010", "wei"));
      const fee = calculateFee(baseNumber);
      const toUser = baseNumber.sub(fee);

      expect(fee).to.be.equal(ethers.BigNumber.from("3030000000000000031"));
      expect(toUser).to.be.equal(ethers.BigNumber.from("97970000000000000979"));
      expect(fee.add(toUser)).to.be.equal(baseNumber);
    });
  });

  describe("Tip ERC20", async () => {
    it("user $SAND balance before tip should be 0", async function () {
      expect(
        await userFacet.balanceERC20(userOne.address, sand.address)
      ).to.equal(0);
    });

    it("send $SAND tip, check balance before and after", async function () {
      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      // check on frontend signature from backend
      // const hash = await ethers.utils.keccak256(ethAddress);
      // const sig = await signer.signMessage(ethers.utils.arrayify(hash));
      // const pk = ethers.utils.recoverPublicKey(hash, sig);

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

    it("check $SAND balance in UserFacet", async function () {
      expect(
        await userFacet.balanceERC20(userOne.address, sand.address)
      ).to.equal(
        ethers.utils
          .parseEther("100.25")
          .sub(calculateFee(ethers.utils.parseEther("100.25")))
      );
      expect(
        await userFacet.balanceERC20(diamondAddress, sand.address)
      ).to.equal(calculateFee(ethers.utils.parseEther("100.25")));
      expect(await sand.balanceOf(diamondAddress)).to.equal(
        ethers.utils.parseEther("100.25")
      );
    });

    it("check UserToken balance after tip", async function () {
      const expectedBalance = ethers.utils
        .parseEther("100.25")
        .mul(ethers.utils.parseEther(ERC20_TOKEN_PRICE["SAND"]))
        .div(ethers.constants.WeiPerEther);

      userTokenBalanceAfterTips = expectedBalance;

      expect(await userToken.balanceOf(sandHodler.address)).to.equal(
        expectedBalance
      );
    });

    it("check $SHIB balance before tip", async function () {
      expect(
        await userFacet.balanceERC20(userOne.address, ERC20_TOKEN_ADDRESS.SHIB)
      ).to.equal(0);
    });

    it("send tip in $SHIB and check changeTokenBalance function", async function () {
      const tokenAmount = ethers.utils
        .parseEther("100101")
        .add(ethers.utils.parseUnits("1010", "wei"));

      await shiba.connect(shibaHodler).approve(diamondAddress, tokenAmount);

      const { signature, signatureData } = await packDataToSign({
        tokenAmountInEther: ethers.utils.formatEther(tokenAmount.toString()),
        // tokenAmount: "10000",
        addressToTip: userOne.address,
        tokenQuote: "SHIB",
        userTokenAddress: userToken.address,
      });

      await expect(
        userFacet
          .connect(shibaHodler)
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
          shibaHodler.address,
          userOne.address,
          ERC20_TOKEN_ADDRESS.SHIB,
          tokenAmount
        )
        .to.changeTokenBalances(
          shiba,
          [shibaHodler, diamondAddress, userOne],
          [tokenAmount.mul("-1"), tokenAmount, 0]
        );
    });

    it("check $SHIB balance after tip", async function () {
      const tokenAmount = ethers.utils
        .parseEther("100101")
        .add(ethers.utils.parseUnits("1010", "wei"));

      expect(
        await userFacet.balanceERC20(userOne.address, shiba.address)
      ).to.equal(tokenAmount.sub(calculateFee(tokenAmount)));
      expect(
        await userFacet.balanceERC20(diamondAddress, shiba.address)
      ).to.equal(calculateFee(tokenAmount));
      expect(await shiba.balanceOf(diamondAddress)).to.equal(tokenAmount);
    });

    it("check UserToken balance after tip", async function () {
      const tokenAmount = ethers.utils
        .parseEther("100101")
        .add(ethers.utils.parseUnits("1010", "wei"));

      const expectedBalance = tokenAmount
        .mul(ethers.utils.parseEther(ERC20_TOKEN_PRICE["SHIB"]))
        .div(ethers.constants.WeiPerEther)
        .add(userTokenBalanceAfterTips);

      userTokenBalanceAfterTips =
        userTokenBalanceAfterTips.add(expectedBalance);

      // add fist tip!
      expect(await userToken.balanceOf(shibaHodler.address)).to.equal(
        expectedBalance
      );
    });

    it("can not send tip if worth is to small ($SHIB)", async function () {
      await expect(
        packDataToSign({
          tokenAmountInEther: "100",
          addressToTip: userOne.address,
          tokenQuote: "SHIB",
          userTokenAddress: userToken.address,
        })
      ).to.be.rejectedWith("Tip worth too little.");
    });

    it("revert when smart contract paused", async function () {
      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      expect(await administrationFacet.paused()).to.be.false;
      await expect(
        administrationFacet.connect(shibaHodler).pause()
      ).to.be.revertedWith("LibDiamond: Must be contract owner");
      await administrationFacet.pause();
      expect(await administrationFacet.paused()).to.be.true;

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
      ).to.be.revertedWith("Smart Contract paused");

      await administrationFacet.unPause();
      expect(await administrationFacet.paused()).to.be.false;

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

    it("revert when address to tip is address zero", async function () {
      await expect(
        packDataToSign({
          tokenAmountInEther: "100",
          addressToTip: ethers.constants.AddressZero,
          tokenQuote: "SAND",
          userTokenAddress: userToken.address,
        })
      ).to.be.rejectedWith("Address to tip can not be address zero.");
    });

    xit("revert when address not register in smart contract (It mjust be handle with db when signature is sign !)", async function () {
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
            signerAdmin.address,
            signatureData.tokenAddress,
            signatureData.userTokenAddress
          )
      ).to.be.revertedWith("Smart Contract paused");
    });

    it("revert when wrong signature", async function () {
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
            ethers.utils.parseEther("0"),
            signatureData.timestamp,
            signerAdmin.address,
            signatureData.tokenAddress,
            signatureData.userTokenAddress
          )
      ).to.be.revertedWith("Wrong signature");
    });

    it("revert when signature time expired", async function () {
      await sand
        .connect(sandHodler)
        .approve(diamondAddress, ethers.utils.parseEther("100.25"));

      const { signature, signatureData } = await packDataToSign({
        tokenAmountInEther: "100.25",
        addressToTip: userOne.address,
        tokenQuote: "SAND",
        userTokenAddress: userToken.address,
      });

      await time.increase(91);

      await await expect(
        userFacet
          .connect(sandHodler)
          .tipERC20(
            signature,
            signatureData.tokenAmountBN,
            signatureData.amountToMint,
            signatureData.tokenToUser,
            signatureData.fee,
            signatureData.timestamp,
            signerAdmin.address,
            signatureData.tokenAddress,
            signatureData.userTokenAddress
          )
      ).to.be.revertedWith("Signature time expired");
    });
  });

  describe("Tip ETH", async () => {
    it("check $ETH balance in Diamond before tip", async () => {
      expect(await userFacet.balanceETH(userOne.address)).to.be.equal(0);
    });

    it("send tip in $ETH and check balances", async function () {
      await expect(() =>
        userFacet
          .connect(sandHodler)
          .tipETH(userOne.address, { value: ethers.utils.parseEther("1") })
      )
        .to.emit(userFacet, "Tip")
        .withArgs(
          sandHodler.address,
          userOne.address,
          ethers.constants.AddressZero,
          ethers.utils.parseEther("1")
        )
        .to.changeEtherBalances(
          [sandHodler, diamondAddress, userOne],
          [ethers.utils.parseEther("-1"), ethers.utils.parseEther("1"), 0]
        );
    });
    it("check $ETH balance after tip", async function () {
      expect(await userFacet.balanceETH(userOne.address)).to.be.equal(
        ethers.utils.parseEther("0.97")
      );
      expect(await userFacet.balanceETH(diamondAddress)).to.be.equal(
        ethers.utils.parseEther("0.03")
      );
    });
    it("Check UserToken balance after tip", async function () {
      const ethPrice = await chailinkPriceFeeds.getLatestPrice(
        CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH
      );

      const expectedBalance = ethers.utils
        .parseEther("1")
        .mul(ethPrice)
        .div(ethers.constants.WeiPerEther)
        .add(userTokenBalanceAfterTips);

      userTokenBalanceAfterTips =
        userTokenBalanceAfterTips.add(expectedBalance);

      expect(await userToken.balanceOf(sandHodler.address)).to.equal(
        expectedBalance
      );
    });

    it("revert when address to tip is address zero", async function () {
      await expect(
        userFacet.connect(sandHodler).tipETH(ethers.constants.AddressZero, {
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("No registered account");
    });

    it("revert when address not register in smart contract", async function () {
      await expect(
        userFacet.connect(sandHodler).tipETH(signerAdmin.address, {
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("No registered account");
    });

    it("revert when smart contract paused", async function () {
      expect(await administrationFacet.paused()).to.be.false;
      await administrationFacet.pause();
      expect(await administrationFacet.paused()).to.be.true;

      await expect(
        userFacet.connect(sandHodler).tipETH(userOne.address, {
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("Smart Contract paused");

      await administrationFacet.unPause();
      expect(await administrationFacet.paused()).to.be.false;

      await expect(
        userFacet.connect(sandHodler).tipETH(userOne.address, {
          value: ethers.utils.parseEther("1"),
        })
      )
        .to.emit(userFacet, "Tip")
        .withArgs(
          sandHodler.address,
          userOne.address,
          ethers.constants.AddressZero,
          ethers.utils.parseEther("1")
        )
        .to.changeEtherBalances(
          [sandHodler, diamondAddress, userOne],
          [ethers.utils.parseEther("-1"), ethers.utils.parseEther("1"), 0]
        );
    });
  });

  describe("Withdraw ERC20", async () => {
    it("user can withdraw one ERC20 token", async () => {
      const balance = await userFacet.balanceERC20(
        userOne.address,
        ERC20_TOKEN_ADDRESS.SAND
      );

      // In test were 2 SAND tips
      expect(balance).to.be.equal(
        ethers.utils
          .parseEther("100.25")
          .mul("2")
          .sub(calculateFee(ethers.utils.parseEther("100.25").mul("2")))
      );

      await expect(
        userFacet.connect(userOne).withdrawERC20(ERC20_TOKEN_ADDRESS.SAND)
      )
        .to.emit(userFacet, "Withdraw")
        .withArgs(userOne.address, ERC20_TOKEN_ADDRESS.SAND, balance)
        .to.changeTokenBalances(
          sand,
          [userOne, diamondAddress],
          [balance, balance.mul("-1")]
        );
    });

    it("user balance in diamond should be zero", async () => {
      expect(
        await userFacet.balanceERC20(userOne.address, ERC20_TOKEN_ADDRESS.SAND)
      ).to.be.equal(0);
    });

    it("user can not withdraw when have zero token on balance", async () => {
      await expect(
        userFacet.connect(userOne).withdrawERC20(ERC20_TOKEN_ADDRESS.SAND)
      ).to.be.revertedWith("You have 0 tokens on balance");
    });

    it("user can withdraw many ERC20 token", async () => {
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
      );

      const balanceSand = await userFacet.balanceERC20(
        userOne.address,
        ERC20_TOKEN_ADDRESS.SAND
      );
      const balanceShiba = await userFacet.balanceERC20(
        userOne.address,
        ERC20_TOKEN_ADDRESS.SHIB
      );
      const expectedBalanceShiba = ethers.utils
        .parseEther("100101")
        .add(ethers.utils.parseUnits("1010", "wei"))
        .sub(
          calculateFee(
            ethers.utils
              .parseEther("100101")
              .add(ethers.utils.parseUnits("1010", "wei"))
          )
        );

      // Intest were 1 SAND tips adn 1 SHIB tip
      expect(balanceSand).to.be.equal(
        ethers.utils
          .parseEther("100.25")
          .sub(calculateFee(ethers.utils.parseEther("100.25")))
      );
      expect(balanceShiba).to.be.equal(expectedBalanceShiba);

      await expect(
        userFacet
          .connect(userOne)
          .withdrawManyERC20([
            ERC20_TOKEN_ADDRESS.SAND,
            ERC20_TOKEN_ADDRESS.SHIB,
          ])
      )
        .to.emit(userFacet, "Withdraw")
        .withArgs(userOne.address, ERC20_TOKEN_ADDRESS.SAND, balanceSand)
        .to.emit(userFacet, "Withdraw")
        .withArgs(userOne.address, ERC20_TOKEN_ADDRESS.SHIB, balanceShiba)
        .to.changeTokenBalances(
          sand,
          [userOne, diamondAddress],
          [balanceSand, balanceSand.mul("-1")]
        )
        .to.changeTokenBalances(
          shiba,
          [userOne, diamondAddress],
          [balanceShiba, balanceShiba.mul("-1")]
        );
    });

    it("user balance in diamond should be zero", async () => {
      expect(
        await userFacet.balanceERC20(userOne.address, ERC20_TOKEN_ADDRESS.SAND)
      ).to.be.equal(0);
      expect(
        await userFacet.balanceERC20(userOne.address, ERC20_TOKEN_ADDRESS.SHIB)
      ).to.be.equal(0);
    });

    it("user can not withdraw when have zero token on balance", async () => {
      await expect(
        userFacet
          .connect(userOne)
          .withdrawManyERC20([
            ERC20_TOKEN_ADDRESS.SAND,
            ERC20_TOKEN_ADDRESS.SHIB,
          ])
      ).to.be.revertedWith("You have 0 tokens on balance");
    });
  });

});
