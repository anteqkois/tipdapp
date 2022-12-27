import { Prisma } from '@tipdapp/server';
import { BigNumber, utils } from 'ethers';

const cutNumber = (amount: string) => {
  // 7 digits exponent, 5 mantissa
  const [exponent, mantissa] = amount.split('.');
  return `${exponent}${mantissa ? '.' + mantissa.slice(0, 5) : ''}`;
};

const parseNotation = (number: Prisma.Decimal) => {
  const hevNumber = utils.hexValue(`0x${Number(number).toString(16)}`);
  const BN = BigNumber.from(hevNumber);
  // const parsedNumber = utils.formatEther(BN, 5);
  const parsedNumber = utils.formatUnits(BN, 5);
  return cutNumber(parsedNumber);
};

export { parseNotation };
