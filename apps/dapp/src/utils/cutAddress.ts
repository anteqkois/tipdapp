import { Address } from 'wagmi';

const cutAddress = (address: string | Address) => {
  return `${address.substr(0, 6)} ... ${address.substr(-4, 4)}`;
};

export { cutAddress };
export default cutAddress;
