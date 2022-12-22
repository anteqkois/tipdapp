// const { signerAdmin, provider } = require("../../utils/ethersProvider");
import { ethers } from "hardhat";
import { ERC20_TOKEN_ADDRESS } from "../constants";

const userAddressToUserTokenAddress = {
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8":
    "0x7542002642420d2eea9164caa79a536dee18ae7f",
};

const signerAdmin = new ethers.Wallet(
  process.env.SIGNER_WALLET_PRIVATE_KEY,
  ethers.provider
);

const tokenPrice = {
  SAND: 0.431765,
  SHIB: 0.00000822,
  ELON: 0.000000287509,
  USDC: 1.0,
  WETH: 1191.23,
  DOGE: 0.075218103662,
  ENJ: 0.25567,
};
//TOD create config file !
// FINAL -> string tokenAmount, string tokenQuote, string addressToDonate
export const packDataToSign = async ({
  tokenAmount,
  tokenQuote,
  addressToDonate,
  userTokenAddress,
}: {
  tokenAmount: string;
  // TODO create all possible quote ?
  tokenQuote: keyof typeof ERC20_TOKEN_ADDRESS;
  addressToDonate: string;
  //TODO in future remove below param
  userTokenAddress: string;
}) => {
  if (addressToDonate === ethers.constants.AddressZero) {
    throw new Error("Address to donate can not be address zero.");
  }
  const tokenAmountBN = ethers.utils.parseEther(tokenAmount);

  //TODO get erc20 token address (donated token) from rigidly typed constants, when dapp grow up store in Redis, if not in DB throw error
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];

  //TODO get userToken address FROM DB using addressToDonate, if not in DB throw error
  // const userTokenAddress = userTokenAddress;

  //TODO at the beginning get from coinmarketcap, when dapp grow up store price in Redis
  const price = tokenPrice[tokenQuote];
  const priceBN = ethers.utils.parseEther(
    Number.parseFloat(price.toString()).toFixed(18)
  );

  const amountToMint = priceBN
    .mul(ethers.utils.parseEther(tokenAmount))
    .div(ethers.constants.WeiPerEther);

  if (amountToMint.lt(ethers.utils.parseEther("0.1"))) {
    throw new Error("Donate worth too little.");
  }

  //TODO get fee from settings ?
  const fee = tokenAmountBN.mul("0300").div("10000");
  const tokenToUser = tokenAmountBN.sub(fee);

  const block = await ethers.provider.getBlockNumber();
  const timestamp = (await ethers.provider.getBlock(block)).timestamp;
  // const timestamp = Math.floor(Date.now() / 1000);

  const hashData = ethers.utils.solidityKeccak256(
    [
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "address",
      "address",
    ],
    [
      tokenAmountBN,
      amountToMint,
      tokenToUser,
      fee,
      timestamp,
      tokenAddress,
      userTokenAddress,
    ]
  );

  const hashDataBinary = ethers.utils.arrayify(hashData);
  const signature = await signerAdmin.signMessage(hashDataBinary);

  return {
    signature,
    signatureData: {
      tokenAmountBN,
      amountToMint,
      tokenToUser,
      fee,
      timestamp,
      tokenAddress,
      userTokenAddress,
    },
  };
};
