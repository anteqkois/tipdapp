const cutAddress = (address) => {
  return `${address.substr(0, 6)} ... ${address.substr(-4, 4)}`;
};

export { cutAddress };
export default cutAddress;
