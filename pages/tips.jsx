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
  selectError,
} from 'src/redux/tipSlice';
import useUser from '@/hooks/useUser';
import Tip from '@/components/tip/Tip';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import Spinner from '@/components/utils/Spinner';
import Pagination from '@/components/pagination';
import TipsDefault from '@/components/tip/TipsDefault';
import { requireAuthPage } from 'utils/requireAuthPage';

const tips = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  
  useEffect(() => {
    dispatch(getTipsByUser({ userWalletAddress: user.address, page: 1 }));
  }, []);

  const error = useSelector(selectError);
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
        {status === STATUS.SUCCEEDED ? <TipsDefault tips={tips} /> : status === STATUS.FAILED ? error : <Spinner />}
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
