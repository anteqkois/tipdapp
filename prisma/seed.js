const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

async function main() {
  const newTx = await prisma.tip.create({
    data: {
      txHash: '0xd12ac901ac86f1856839019bd4d031c9929bafd4',
      displayed: false,
      tokenAmount: '900000000000000000000',
      value: '562000000000000000000',
      message: 'New wallet !',
      userWalletAddress: '0x3665b77813a64c48b700bd45dcb9998ddf7b6d63',
      cryptocurrencyAddress: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
      tipperWalletAddress: '0xfdacb27dc605f21255108d4895bb91701a2c26cd',
    },
  });
  console.log(newTx);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
