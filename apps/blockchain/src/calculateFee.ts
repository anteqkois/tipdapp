import { ethers } from "ethers";

type BigNumber = typeof ethers.BigNumber.prototype;

export const calculateFee = (tokenAmount: BigNumber) => {
  const result = tokenAmount.mul("0300").div("10000");
  
  
  return tokenAmount.mul("0300").mod("10000").eq("0")
    ? result
    : result.add("1");
  // if (tokenAmount.mul("0300").mod("10000").eq("0")) return result;
  // return result.add("1");
};
// export const calculateFee = (tokenAmount: BigNumber) => {
//   return tokenAmount.mul("0300").div("10000");
// };
