'use client';
import { Avatar, Button, Card } from '@/components/utils';
import { useUser } from '@/hooks';
import cutAddress from '@/utils/cutAddress';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const { user } = useUser();

  return (
    <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
      <Card className="flex items-center gap-4 col-span-2 row-span-2">
        <Avatar
          avatar={user?.avatar}
          address={user?.address}
          className="!w-14"
        />
        <div>
          <h5 className="mb-1">
            Hey{' '}
            <span className="underline decoration-2 decoration-primary ">
              {user?.nick}
            </span>{' '}
            !
          </h5>
          <p>
            Connected wallet:{' '}
            <span className="font-medium">
              {cutAddress(user?.address ?? '')}
            </span>
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
      <Card className="col-span-full">
        <h4 className="mb-4">Latest tips:</h4>
        {children}
        <div className="flex justify-end">
          <Button className="mt-4">
            <Link href="/user/tips">See more tips</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
