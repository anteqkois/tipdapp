import { address, UserFacetAbi } from '@tipdapp/contracts';

export const userFacetInstance = {
  hardhat: {
    address: address['hardhat'].Diamond,
    abi: UserFacetAbi,
  },
};
