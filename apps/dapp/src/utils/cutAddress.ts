import { Address } from 'wagmi';

export const cutAddress = (address: string | Address) =>
  `${address.substr(0, 6)} ... ${address.substr(-4, 4)}`;
