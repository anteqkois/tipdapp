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

// import { PrismaClient } from '@prisma/client';
// const prismaClient = new PrismaClient();
// export default prismaClient;

const { PrismaClient } = require('@prisma/client');
// const prismaClient = new PrismaClient({log: ['query']});
const prismaClient = new PrismaClient();
module.exports = { prismaClient };
