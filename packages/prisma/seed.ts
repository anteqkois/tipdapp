import { faker } from '@faker-js/faker';
import client from './client';
import coins from './tokens.json';

const { PrismaClient } = client;

const prisma = new PrismaClient();

const ADDRESS_WALLET_DEV = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const ADDRESS_WALLET_DEV_2 = '0x69E952d100e786aAA6B63a3473D67ccaF1183271';
const ADDRESS_SAND = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';

async function main() {
  // create user
  const user = await prisma.user.create({
    data: {
      email: 'anteqkois.dev@gmail.com',
      firstName: 'Antek',
      lastName: 'Kois',
      nick: 'anteqkois',
      address: ADDRESS_WALLET_DEV,
      roles: ['streamer'],
      activeRole: 'streamer',
      streamer: {
        create: {
          page: {
            create: {
              role: 'streamer',
              affixUrl: 'anteqkois',
              description:
                '(ZAYEBANE NA TESTY)\nSIEMANO TU DAMIANO!Darowizny stanowią dla mnie ogromne wsparcie. Świadczą o tym, że doceniasz moją pracę. Poza tym pomagają mi w opłacaniu rachunków. Dzięki Tobie mogę rozwijać swój kanał!Jeśli chcesz mi pomóc, dobrowolnie wpłacając kwotę w jakikolwiek z poniższych sposobów, to bądź świadomy, że jestem Ci mocno wdzięczny.Donejty nie podlegają zwrotom.',
            },
          },
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: 'whitex@gmail.com',
      firstName: 'Konrad',
      lastName: 'Kois',
      nick: 'whitex123',
      address: ADDRESS_WALLET_DEV_2,
      roles: ['streamer'],
      activeRole: 'streamer',
      streamer: {
        create: {
          page: {
            create: {
              role: 'streamer',
              affixUrl: 'whitex',
            },
          },
        },
      },
    },
  });
  console.log('Create user:', user);

  const createTokenPromises = [];
  for (let i = 0; i < coins.length; i++) {
    const { address, chainId, coinGeckoId, imageUrl, name, symbol } = coins[i];

    createTokenPromises.push(
      //@ts-expect-error
      prisma.token.create({
        data: {
          address,
          coinGeckoId,
          chainId,
          name,
          symbol,
          image: {
            connectOrCreate: {
              where: { url: imageUrl },
              create: {
                url: imageUrl,
                extension: 'png',
                filename: symbol,
              },
            },
          },
        },
      })
    );
  }
  await Promise.all(createTokenPromises);

  const createTipperPromises = [];
  for (let index = 0; index < 3; index++) {
    createTipperPromises.push(
      //@ts-expect-error
      prisma.tipper.create({
        data: {
          address: faker.finance.ethereumAddress(),
          nick: faker.name.firstName(),
        },
      })
    );
  }
  await Promise.all(createTipperPromises);

  const tipers = await prisma.tipper.findMany({
    select: {
      address: true,
    },
  });

  console.log('Create tipers:', tipers);
  const tippersAddress = tipers.map((tipper) => tipper.address);

  const userToken = await prisma.userToken.create({
    data: {
      address: faker.finance.ethereumAddress(),
      chainId: 31337,
      name: faker.finance.currencyName(),
      symbol: faker.finance.currencyCode(),
      txHash: faker.datatype.hexadecimal({ length: 10 }),
      user: {
        connect: {
          address: ADDRESS_WALLET_DEV_2,
        },
      },
    },
  });

  const createTipPromises = [];
  for (let i = 0; i < 50; i++) {
    // const element = array[i];
    const value = faker.datatype.number({
      min: 1000_000000000000000000,
      max: 10000_000000000000000000,
    });
    createTipPromises.push(
      //@ts-expect-error
      prisma.tip.create({
        data: {
          txHash: faker.datatype.hexadecimal({ length: 10 }),
          message: faker.lorem.paragraph(),
          amount: faker.datatype.number({
            min: 1000_000000000000000000,
            max: 10000_000000000000000000,
          }),
          value,
          date: faker.datatype.datetime({
            min: 1577836800000,
            max: 1893456000000,
          }),
          displayed: faker.datatype.boolean(),
          userRole: 'streamer',
          user: {
            connect: {
              address: ADDRESS_WALLET_DEV,
            },
          },
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
          receivedTokensAmount: value,
          userToken: {
            connect: {
              address: userToken.address,
            },
          },
        },
      })
    );
  }
  await Promise.all(createTipPromises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
