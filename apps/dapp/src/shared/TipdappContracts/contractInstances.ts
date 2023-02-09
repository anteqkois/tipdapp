import { address, UserFacetAbi } from '@tipdapp/contracts';

export const userFacetInstance = {
  Hardhat: {
    address: address['hardhat'].Diamond,
    abi: UserFacetAbi,
  },
};
