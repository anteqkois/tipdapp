import { address, UserFacetAbi } from '@tipdapp/contracts';
import { Address } from '@wagmi/core';

export const userFacetInstance = {
  Hardhat: {
    address: address.hardhat.Diamond as Address,
    abi: UserFacetAbi,
  },
  Localhost: {
    address: address.localhost.Diamond as Address,
    abi: UserFacetAbi,
  },
};
