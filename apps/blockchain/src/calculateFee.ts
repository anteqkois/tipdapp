import { constants } from '@tipdapp/helpers';
import { ethers } from 'ethers';

type BigNumber = typeof ethers.BigNumber.prototype;

export const calculateFee = (tokenAmount: BigNumber) => {
  // 0100=>1%  0010=>0,1%  0001=>0,01%  0300=>3%  0030=>0,3%
  const result = tokenAmount.mul(constants.config.fee).div('10000');

  return tokenAmount.mul(constants.config.fee).mod('10000').eq('0')
    ? result
    : result.add('1');
  // if (tokenAmount.mul("0300").mod("10000").eq("0")) return result;
  // return result.add("1");
};
// export const calculateFee = (tokenAmount: BigNumber) => {
//   return tokenAmount.mul("0300").div("10000");
// };
