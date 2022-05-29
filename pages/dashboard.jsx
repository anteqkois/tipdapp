import { requireAuthPage } from '../utils/requireAuthPage';
import React from 'react';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';

const dashboard = ({ user }) => {
  // console.log(user);
  return (
    <section className="grid gap-2 lg:grid-cols-4 lg:gap-4">
      <Card className="col-span-2 row-span-2  flex items-center gap-4">
        <div className="hidden w-36 h-36 bg-red-700 lg:block"></div>
        <div>
          <h6>
            Hey <span className="underline decoration-2 decoration-primary-600">anteqkois</span> !
          </h6>
          <p>
            You are connected from <span className="font-medium">x0hb234167wsdbjkhjkq89123</span> account
          </p>
        </div>
      </Card>
      <Card className="lg:order-last">
        <h6>Latest tips</h6>
        <Button>see all</Button>
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

// export const getServerSideProps = requireAuthPage(async (ctx) => {
//   return {
//     props: { user: ctx.req.user },
//   };
// });
