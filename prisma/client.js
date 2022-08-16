// import { PrismaClient } from '@prisma/client';

// let prisma;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }

//   prisma = global.prisma;
// }

// export default prisma;

// const { PrismaClient } = require('@prisma/client');
// // const prismaClient = new PrismaClient({log: ['query']});
// const prismaClient = new PrismaClient();
// module.exports = { prismaClient };

// declare global {
// eslint-disable-next-line no-var
// var prisma: PrismaClient | undefined;
// }

const { PrismaClient } = require('@prisma/client');

const prismaClient =
  global.prismaClient ||
  new PrismaClient({
    // log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient;
}

module.exports = { prismaClient };
