import { faker } from '@faker-js/faker';
import client from '@prisma/client';
// import * as runtime from '@prisma/client/runtime/index.js';
const { PrismaClient } = client;
// const { Decimal } = runtime;

const prisma = new PrismaClient();

const ADDRESS_WALLET_DEV = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const ADDRESS_SAND = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';

async function main() {
  //create user
  const user = await prisma.user.create({
    data: {
      email: 'anteqkois.dev@gmail.com',
      firstName: 'Antek',
      lastName: 'Kois',
      nick: 'anteqkois',
      address: ADDRESS_WALLET_DEV,
      page: {
        create: {
          url: 'anteqkois',
        },
      },
    },
  });
  console.log('Create user:', user);

  //create cryptocurenncy
  const sand = await prisma.token.create({
    data: {
      address: ADDRESS_SAND,
      chainId: 1,
      name: 'SAND',
      symbol: 'SAND',
    },
  });
  console.log('Create SAND:', sand);

  //create tipers
  await prisma.tipper.createMany({
    data: [
      {
        address: faker.finance.ethereumAddress(),
        nick: faker.name.firstName(),
      },
      {
        address: faker.finance.ethereumAddress(),
        nick: faker.name.firstName(),
      },
      {
        address: faker.finance.ethereumAddress(),
        nick: faker.name.firstName(),
      },
    ],
  });
  const tipers = await prisma.tipper.findMany({
    select: {
      address: true,
    },
  });

  console.log('Create tipers:', tipers);
  const tippersAddress = tipers.map((tipper) => tipper.address);

  for (let i = 0; i < 50; i++) {
    // const element = array[i];
    const newTip = await prisma.tip.create({
      data: {
        message: faker.lorem.paragraph(),
        txHash: faker.datatype.hexadecimal({ length: 10 }),
        amount: faker.datatype.number({
          min: 1000_000000000000000000,
          max: 10000_000000000000000000,
        }),
        value: faker.datatype.number({
          min: 1000_000000000000000000,
          max: 10000_000000000000000000,
        }),
        date: faker.datatype.datetime({
          min: 1577836800000,
          max: 1893456000000,
        }),
        displayed: faker.datatype.boolean(),
        token: {
          connect: {
            address: ADDRESS_SAND,
          },
        },
        tipper: {
          connect: {
            address: faker.helpers.arrayElement(tippersAddress),
          },
        },
        user: {
          connect: {
            address: ADDRESS_WALLET_DEV,
          },
        },

        // token:
        // txHash: '0xd12ac901ac86f1856839019bd4d031c9929bafd4',
        // displayed: false,
        // amount: '900000000000000000000',
        // value: '562000000000000000000',
        // message: 'New wallet !',
        // userAddress: '0x3665b77813a64c48b700bd45dcb9998ddf7b6d63',
        // tokenAddress: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
        // tipperAddress: '0xfdacb27dc605f21255108d4895bb91701a2c26cd',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
