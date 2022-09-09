import Pagination from '@/components/pagination';
import TipsDefault from '@/components/tip/TipsDefault';
import Card from '@/components/utils/Card';
import Spinner from '@/components/utils/Spinner';
import useUser from '@/hooks/useUser';
import { requireAuthPage } from '@/utils/requireAuthPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTipsByUser,
  selectError,
  selectPageAmount,
  selectPageSize,
  selectStatus,
  selectTipsPerPage,
  STATUS,
} from 'src/redux/tipSlice';

const Tips = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    user.walletAddress && dispatch(getTipsByUser({ userWalletAddress: user.walletAddress, page: 1 }));
  }, [user.walletAddress]);

  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const tips = useSelector(selectTipsPerPage);
  const pageSize = useSelector(selectPageSize);
  const pageAmount = useSelector(selectPageAmount);

  const handlePageChange = (page) => {
    console.log('user.walletAddress', user.walletAddress);
    dispatch(getTipsByUser({ userWalletAddress: user.walletAddress, page }));
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

export default Tips;

export const getServerSideProps = requireAuthPage((ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
