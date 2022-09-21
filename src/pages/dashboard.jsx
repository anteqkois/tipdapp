import TipsDefault from '@/components/Tip/TipsDefault';
import { Avatar, Card, StateUI } from '@/components/utils';
import { useUser } from '@/hooks';
import { ASYNC_STATUS } from '@/utils/constants';
import cutAddress from '@/utils/cutAddress';
import { useSelector } from 'react-redux';
import { selectCurrentData } from 'src/lib/redux/tipSlice';

const Dashboard = () => {
  const { user } = useUser();

  const { status, error, tips } = useSelector(selectCurrentData);

  return (
    <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
      <Card className="flex items-center gap-4 col-span-2 row-span-2">
        <Avatar avatarPath={user} walletAddress={user.walletAddress} className="!w-14" />
        <div>
          <h5 className="mb-1">
            Hey <span className="underline decoration-2 decoration-primary ">{user.nick}</span> !
          </h5>
          <p>
            Connected wallet: <span className="font-medium">{cutAddress(user.walletAddress)}</span>
          </p>
        </div>
      </Card>
      <Card className="text-center">
        <p className="text-4xl font-semibold text-primary">13 092</p>
        <h6>All tips amount</h6>
      </Card>
      <Card className="text-center">
        <p className="text-4xl font-semibold text-secondary-600">92</p>
        <h6>Tips tuday</h6>
      </Card>
      <Card className="text-center">
        <p className="text-4xl font-semibold">13 078</p>
        <h6>Showed messages</h6>
      </Card>
      <Card className="text-center">
        <p className="text-4xl font-semibold">12</p>
        <h6>Handled tokens by you</h6>
      </Card>
      <Card className="col-span-full lg:p-8">
        <h4 className="mb-4">Latest tips:</h4>
        <StateUI
          isLoading={status === ASYNC_STATUS.LOADING}
          isEmpty={tips.length === 0}
          EmptyComponent={<li className="w-full text-center">No tips to show</li>}
        >
          <TipsDefault tips={tips} />
        </StateUI>
      </Card>
    </section>
  );
};

Dashboard.isProtected = true;

export default Dashboard;

// export const getServerSideProps = requireAuthPage(async (ctx) => {
//   return {
//     props: { user: ctx.req.user },
//   };
// });

// export const getServerSideProps = requireAuthPage(async (ctx) => {
//   console.log(ctx.req);

//   return {
//     props: { user: ctx.req.user },
//   };
// });
