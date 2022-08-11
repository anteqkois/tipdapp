import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  STATUS,
  getTipsByUser,
  selectTipsPerPage,
  selectPageAmount,
  selectPageSize,
  selectTipsAmount,
  selectStatus,
  setCurrentPage,
} from 'src/redux/tipSlice';
import ReactPaginate from 'react-paginate';
import Tip from '@/components/tip/tip';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import Spinner from '@/components/utils/Spinner';
import Pagination from '@/components/pagination';
// import Pagination from '@/components/pagination';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipsByUser({ userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d', page: 1 }));
  }, []);

  // const data = useSelector(tipsSelectors.selectAll);

  const status = useSelector(selectStatus);
  const tips = useSelector(selectTipsPerPage);
  const tipsAmount = useSelector(selectTipsAmount);
  const pageSize = useSelector(selectPageSize);
  const pageAmount = useSelector(selectPageAmount);

  const handlePageChange = (page) => {
    dispatch(getTipsByUser({ userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d', page }));
  };

  return (
    <section>
      <Card className="flex flex-col lg:p-8">
        <h5 className="pb-4">Your tips:</h5>
        <span className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
        {status === STATUS.SUCCEEDED ? (
          <>
            <ul>
              {tips.map((tip) => (
                <li key={tip.txHash} className="w-full">
                  <Tip {...tip} />
                  <div className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Spinner />
        )}
        <div className="flex items-center justify-center pt-4 text-lg">
          <Pagination
            onPageChange={handlePageChange}
            pageRangeDisplayed={2}
            buttonsMarginPage={1}
            pageAmount={Math.ceil(tipsAmount / pageSize)}
          />
        </div>
      </Card>
    </section>
  );
};

export default tips;
