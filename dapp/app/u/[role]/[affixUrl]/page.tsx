'use client';

import { usePageFindByAffixUrl } from '@/modules/Page/hooks/usePageQuery';
import { TipForm } from '@/modules/Tip/containers/TipForm';
import { Card, MainContainer, SocialLink, Verified } from '@/shared/ui';
import Avatar from '@/shared/User/components/Avatar';
import { Role } from '@tipdapp/server';
import Image from 'next/image';

type Props = {
  params: {
    role: Role;
    affixUrl: string;
  };
};

export default function Page({ params }: Props) {
  const { data, error } = usePageFindByAffixUrl({
    params,
  });

  const { page, user } = data!;

  return (
    <div className="bg-[url('/wave.svg')] bg-no-repeat bg-cover bg-center w-screen h-screen">
      <MainContainer className="grid gap-2 grid-cols-[3fr_1fr] ">
        <Card className="row-start-1 col-span-2">
          <div className="relative w-full aspect-video mb-7 max-h-60">
            <Image
              className="rounded"
              src={'/sky.jpeg'}
              alt="user baner"
              fill={true}
            />
          </div>
          <div className="flex items-center justify-center -mt-20">
            <Avatar
              avatar={user.avatar}
              address={user.address}
              className="!w-20 !h-20 outline outline-8 outline-neutral-50"
            />
          </div>
          <h2 className="text-center p-2">{user.nick}</h2>
          <p className="flex items-center gap-1 text-neutral-500 italic">
            <Verified verified={user.verified} />
            {user.verified ? 'Verivied user' : 'Not verivied user'}
          </p>
          <p className="p-2">{page.description}</p>
        </Card>
        <Card className="row-start-2 col-span-2 lg:col-span-1">
          <TipForm />
        </Card>
        <Card className="row-start-3 col-span-2 flex flex-col gap-2 lg:row-start-2 lg:col-start-2 lg:col-span-1">
          <h5>User details</h5>
          <div>
            <span>Tips amount: {323}</span>
          </div>
          <div>
            <span>Last tip value:</span>
          </div>
          <div>
            <span>Last tip transaction:</span>
          </div>
          <div>
            <span>Last tip transaction:</span>
          </div>
          <SocialLink
            href="https://youtube.com"
            socialMedium="youtube"
          />
          <SocialLink
            href="https://youtube.com"
            socialMedium="twitch"
          />
        </Card>
      </MainContainer>
    </div>
  );
}
