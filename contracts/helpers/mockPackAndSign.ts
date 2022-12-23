import { ethers } from "hardhat";
import { ERC20_TOKEN_ADDRESS, ERC20_TOKEN_PRICE } from "../constants";
import { calculateFee } from "./calculateFee";

const signerAdmin = new ethers.Wallet(
  process.env.SIGNER_WALLET_PRIVATE_KEY,
  ethers.provider
);

//TOD create config file !
// FINAL -> string tokenAmountInEther, string tokenQuote, string addressToDonate
export const packDataToSign = async ({
  tokenAmountInEther,
  tokenQuote,
  addressToDonate,
  userTokenAddress,
}: {
  tokenAmountInEther: string;
  // TODO create all possible quote ?
  tokenQuote: keyof typeof ERC20_TOKEN_ADDRESS;
  addressToDonate: string;
  //TODO in future remove below param
  userTokenAddress: string;
}) => {
  if (addressToDonate === ethers.constants.AddressZero) {
    throw new Error("Address to donate can not be address zero.");
  }
  const tokenAmountBN = ethers.utils.parseEther(tokenAmountInEther);

  //TODO get erc20 token address (donated token) from rigidly typed constants, when dapp grow up store in Redis, if not in DB throw error
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];

  //TODO get userToken address FROM DB using addressToDonate, if not in DB throw error
  // const userTokenAddress = userTokenAddress;

  //TODO at the beginning get from coinmarketcap, when dapp grow up store price in Redis
  const price = ERC20_TOKEN_PRICE[tokenQuote];

  const priceBN = ethers.utils.parseEther(ERC20_TOKEN_PRICE[tokenQuote]);

  const amountToMint = priceBN
    .mul(tokenAmountBN)
    .div(ethers.constants.WeiPerEther);

  if (amountToMint.lt(ethers.utils.parseEther("0.1"))) {
    throw new Error("Donate worth too little.");
  }

  //TODO get fee from settings ?
  const fee = calculateFee(tokenAmountBN);
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
