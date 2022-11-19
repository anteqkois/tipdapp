import prisma from '../config/db.js';

const find = async ({ where }) => {
  return await prisma.userToken.findFirst({
    where,
  });
};

const create = async ({ address, symbol, name, chainId, txHash, userAddress }) => {
  return await prisma.userToken.create({
    data: {
      address,
      symbol,
      name,
      chainId,
      txHash,
      user: {
        connect: {
          address: userAddress,
        },
      },
    },
  });
};

const UserToken = { find, create };
export { UserToken };
