import Pagination from '@/components/Pagination';
import TipsDefault from '@/components/Tip/TipsDefault';
import { Card, StateUI } from '@/components/utils';
import useUser from '@/hooks/useUser';
import {
  getTipsByUser,
  selectCurrentData,
  selectPageAmount,
  selectPageSize,
} from '@/lib/redux/tipSlice';
import { useDispatch, useSelector } from 'react-redux';

const Tips = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { status, error, tips } = useSelector(selectCurrentData);
  const pageSize = useSelector(selectPageSize);
  const pageAmount = useSelector(selectPageAmount);

  const handlePageChange = (page) => {
    dispatch(getTipsByUser({ userAddress: user.address, page }));
  };

  //TODO! useErrorBoundary
  return (
    <section>
      <Card className="flex flex-col ">
        <h4 className="pb-4">Your tips:</h4>
        <StateUI
          loading={status === asyncStatus.loading}
          empty={tips.length === 0}
          EmptyComponent={
            <li className="w-full text-center">No tips to show</li>
          }
        >
          <TipsDefault tips={tips} />
        </StateUI>
        <div className="flex items-center justify-center pt-4 text-lg">
          <Pagination
            onPageChange={handlePageChange}
            pageRangeDisplayed={2}
            buttonsMarginPage={2}
            pageAmount={pageAmount}
          />
        </div>
      </Card>
    </section>
  );
};

Tips.isProtected = true;

export default Tips;
