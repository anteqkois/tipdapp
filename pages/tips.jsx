import Tip from '@/components/tip/tip';
import Card from '@/components/utils/Card';
import React from 'react';

const tipsData = [
  {
    txHash: '0x05f40c178a69696d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '789356000000000000000000',
    value: '80000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: true,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'SHIB',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'rudy56',
  },
  {
    txHash: '0xmd865c178a69696d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '45000000000000000',
    value: '280000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: true,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'ETH',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'any2356',
  },
  ,
  {
    txHash: '0x92hbv6sasdcass6d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '10000000000000000000',
    value: '280000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: false,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'ATOM',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'anteqkois',
  },
];

const tips = () => {
  return (
    <section>
      <Card {...tipsData} className="flex flex-col gap-6">
        <h5 className="">Your tips</h5>
        {tipsData.map((tip) => (
          <Tip {...tip} key={tip.txHash} />
        ))}
      </Card>
    </section>
  );
};

export default tips;
