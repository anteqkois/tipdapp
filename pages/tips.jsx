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
import useUser from '@/hooks/useUser';
import Tip from '@/components/tip/Tip';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import Spinner from '@/components/utils/Spinner';
import Pagination from '@/components/pagination';
import TipsDefault from '@/components/tip/TipsDefault';
import { requireAuthPage } from 'utils/requireAuthPage';

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

const tips = ({ user }) => {
  const dispatch = useDispatch();
  // const { user } = useUser();
  console.log(user);
  useEffect(() => {
    dispatch(getTipsByUser({ userWalletAddress: user.address, page: 1 }));
  }, []);

  const status = useSelector(selectStatus);
  const tips = useSelector(selectTipsPerPage);
  const pageSize = useSelector(selectPageSize);
  const pageAmount = useSelector(selectPageAmount);

  const handlePageChange = (page) => {
    dispatch(getTipsByUser({ userWalletAddress: user.address, page }));
  };

  //TODO! useErrorBoundary
  return (
    <section>
      <Card className="flex flex-col lg:p-8">
        <h4 className="pb-4">Your tips:</h4>
        {status === STATUS.SUCCEEDED ? <TipsDefault tips={tips} /> : <Spinner />}
        <div className="flex items-center justify-center pt-4 text-lg">
          <Pagination onPageChange={handlePageChange} pageRangeDisplayed={2} buttonsMarginPage={2} pageAmount={pageAmount} />
        </div>
      </Card>
    </section>
  );
};

export default tips;

export const getServerSideProps = requireAuthPage(async (ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
