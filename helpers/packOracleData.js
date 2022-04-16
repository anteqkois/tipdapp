const { ethers } = require('hardhat');

const packToBytes32 = (oracleAddress, flags) => {
  let packedFlags = 0;

  if (flags?.inUSD) {
    packedFlags |= 1 << 31;
  }
  if (flags?.isChailink) {
    packedFlags |= 1 << 30;
  }

  return ethers.utils.solidityPack(['address', 'uint32', 'uint64'], [oracleAddress, packedFlags, 0]);
};

const unpackFromBytes32 = (packedData) => {
  const oracleAddress = ethers.utils.getAddress(ethers.utils.hexDataSlice(packedData, 0, 20));
  const flags = ethers.utils.hexDataSlice(packedData, 20, 24);
  const inUSD = !!(flags & (1 << 31));
  const isChailink = !!(flags & (1 << 30));
  return {
    oracleAddress,
    inUSD,
    isChailink,
  };
};

module.exports = { packToBytes32, unpackFromBytes32 };
