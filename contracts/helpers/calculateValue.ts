import { ethers } from "hardhat";

export const calculateValue = (tokenAmount: string, price: string) => {
  return ethers.utils
    .parseEther(tokenAmount)
    .mul(ethers.utils.parseEther(price))
    .div(ethers.constants.WeiPerEther);
};
