import { PrismaClient } from '@prisma/client';

// const prismaClient =
//     global.prismaClient ||
//     new PrismaClient({
//         // log: ['query'],
//     });
// if (process.env.NODE_ENV !== 'production') {
//     global.prismaClient = prismaClient;
// // }
// const prismaClient = new PrismaClient({
//     // log: ['query'],
// });

// export { prismaClient };
// export default prismaClient;

// let prismaClient;
// 
// if (process.env.NODE_ENV === 'production') {
//   prismaClient = new PrismaClient();
// } else {
//   if (!global.prismaClient) {
//     global.prismaClient = new PrismaClient();
//   }
//   prismaClient = global.prismaClient;
// }

const prismaClient = new PrismaClient();

export { prismaClient };
export default prismaClient;
