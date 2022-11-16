import prisma from '../config/db.js';
import { signUpValidation } from '../validation/signUpValidaion.old.js';

const create = async (data) => {
  return await prisma.user.create({
    data: {
      address: data.address,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      nick: data.nick,
      page: {
        create: {
          url: data.nick,
        },
      },
    },
    include: {
      avatar: true,
      token: {
        select: {
          address: true,
          chainId: true,
          name: true,
          symbol: true,
          txHash: true,
        },
      },
      page: true,
    },
  });

};

const find = async (data) => {
  return await prisma.user.findFirst({
    where: {
      address: data.address,
    },
    include: {
      avatar: true,
      token: {
        select: {
          address: true,
          chainId: true,
          name: true,
          symbol: true,
          txHash: true,
        },
      },
      page: true,
      // Widget: true,
      // Withdraw: true,
    },
  });
};

const checkIfExist = async({nick, email, address})=>{
 return await prisma.user.findFirst({
   where: {
     OR: [{ email }, { nick }, {address}],
   },
   // select: {
   //   email: true,
   //   nick: true,
   // },
 });
}

const User = { create, find, checkIfExist };
export { User };
