import Card from '@/components/utils/Card';
import useUser from '@/hooks/useUser';
import { requireAuthPage } from '@/utils/requireAuthPage';
// import { useGetTipsByUserQuery } from 'src/redux/tipSlice';

const dashboard = () => {
  const { user } = useUser();
  // const { data, isLoading, isError } = useGetTipsByUserQuery({
  //   userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d',
  // });

  return (
    <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
      <Card className="flex items-center col-span-2 row-span-2 gap-4">
        <div className="hidden bg-red-700 w-36 h-36 aspect-square lg:block"></div>
        <div>
          <h6>
            Hey <span className="underline decoration-2 decoration-primary-600">{user.nick}</span> !
          </h6>
          <p>
            You are connected from{' '}
            <span className="font-medium">
              {user.walletAddress.substr(0, 5)}...{user.walletAddress.substr(-4, 4)}
            </span>{' '}
            account
          </p>
        </div>
      </Card>
      <Card className="col-span-full lg:order-last lg:p-8">
        <h6>Latest tips</h6>
        <div className="w-[calc(100%+2rem)] mt-3 -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
        {/* {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ul>
              {data.map((tip) => (
                <li key={tip.txHash} className="w-full">
                  <Tip {...tip} />
                  <div className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center pt-4 text-lg" onClick={() => console.log('click')}>
              <Link href={'tips'}>
                <Button>See more your's tips</Button>
              </Link>
            </div>
          </>
        )} */}
      </Card>
      <Card className="text-center">
        <p className="text-4xl font-semibold text-primary-600">13 092</p>
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
    </section>
  );
};

export default dashboard;

export const getServerSideProps = requireAuthPage(async (ctx) => {
  return {
    props: { user: ctx.req.user },
  };
});
