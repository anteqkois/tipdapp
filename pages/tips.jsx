import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTipsByUserQuery } from 'src/redux/tipSlice';
import Tip from '@/components/tip/tip';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import Spinner from '@/components/utils/Spinner';

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
  const { data, isLoading, isError  } = useGetTipsByUserQuery({
    userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d',
  });

  console.log(data);
  // const isLoading = true;

  return (
    <section>
      <Card {...tipsData} className="flex flex-col">
        <h5 className="">Your tips:</h5>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data.map((tip) => (
              <Tip {...tip} key={tip.txHash} />
            ))}
            <div className="flex items-center justify-center" onClick={() => console.log('click')}>
              <div className="flex gap-1 py-2 items-center">
                <svg className="w-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 7.48946C8.61925 7.48946 7.5 6.37021 7.5 4.98946C7.5 3.60871 8.61925 2.48946 10 2.48946L30 2.48946C31.3807 2.48946 32.5 3.60871 32.5 4.98946C32.5 6.37021 31.3807 7.48946 30 7.48946L10 7.48946ZM20 38.525L10.7323 29.2572C9.756 28.2809 9.756 26.698 10.7323 25.7217C11.7085 24.7454 13.2915 24.7454 14.2678 25.7217L17.5 28.9539L17.5 12.4895C17.5 11.1087 18.6193 9.98946 20 9.98946C21.3807 9.98946 22.5 11.1087 22.5 12.4895L22.5 28.9539L25.7322 25.7217C26.7086 24.7454 28.2915 24.7454 29.2678 25.7217C30.2441 26.698 30.2441 28.2809 29.2678 29.2572L20 38.525Z"
                    fill="black"
                  />
                </svg>
                <Button type="minimalist">See more your's tips</Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default tips;
