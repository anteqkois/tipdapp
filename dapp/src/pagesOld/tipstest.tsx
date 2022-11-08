import Pagination from '@/components/Pagination';
import { TipsList } from '@/components/Tip/TipsList';
import { Card, StateUI } from '@/components/utils';
// import useUser from '@/hooks/useUser';
import {
  getTipsByUser,
  selectCurrentData,
  selectPageAmount,
} from '@/lib/redux/tipSlice';
import { asyncStatus } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const Tips = () => {
  const dispatch = useDispatch();
  // const { user } = useUser();

  const { status, error, tips } = useSelector(selectCurrentData);
  const pageAmount = useSelector(selectPageAmount);

  const handlePageChange = (page: number) => {
    //@ts-ignore
    dispatch(getTipsByUser({ page }));
  };

  return (
    <section>
      <Card className="flex flex-col ">
        <h4 className="pb-4">Your tips:</h4>
        <StateUI
          loading={status === asyncStatus.loading}
          empty={tips.length === 0}
          error={error}
          EmptyComponent={<p className="w-full text-center">No tips to show</p>}
        >
          <TipsList
            tips={tips}
            tipView="Minimalist"
          />
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