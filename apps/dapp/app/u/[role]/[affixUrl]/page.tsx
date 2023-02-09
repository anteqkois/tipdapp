'use client';

import { usePageFindByAffixUrl } from '@/modules/Page/hooks/usePageQuery';
import { TipForm } from '@/modules/Tip/containers/TipForm';
import { TokenPriceList } from '@/modules/Token/components/TokenPriceList';
import { useTokenGetDetails } from '@/modules/Token/hooks/useTokenQuery';
import {
  Card,
  InfoParagraph,
  MainContainer,
  SocialLink,
  Verified,
} from '@/shared/ui';
import Avatar from '@/shared/User/components/Avatar';
import { Role } from '@tipdapp/database';
import Image from 'next/image';

type Props = {
  params: {
    role: Role;
    affixUrl: string;
  };
};

export default function Page({ params }: Props) {
  const { data: pageRes } = usePageFindByAffixUrl({
    params,
  });

  // const activeTokensSymbol = ['sand', 'shib', 'bnb'];

  const { data: tokenRes, error } = useTokenGetDetails({
    // symbol: activeTokensSymbol,
  });

  const { page, user } = pageRes!;

  return (
    <div className="h-screen w-screen bg-[url('/wave.svg')] bg-cover bg-center bg-no-repeat">
      <MainContainer className="grid grid-cols-[7fr_3fr] gap-2 ">
        <Card className="col-span-2 row-start-1">
          <div className="relative mb-7 aspect-video max-h-60 w-full">
            <Image
              className="rounded"
              src={'/sky.jpeg'}
              alt="user baner"
              fill={true}
            />
          </div>
          <div className="-mt-20 flex items-center justify-center">
            <Avatar
              avatar={user.avatar}
              address={user.address}
              className="!h-20 !w-20 outline outline-8 outline-neutral-50"
            />
          </div>
          <h2 className="p-2 text-center">{user.nick}</h2>
          <p className="flex items-center gap-1 italic text-neutral-500">
            <Verified verified={user.verified} />
            {user.verified ? 'Verivied user' : 'Not verivied user'}
          </p>
          <p className="p-2">{page.description}</p>
        </Card>
        <Card className="col-span-2 row-start-2 lg:col-span-1">
          <TipForm />
        </Card>
        <Card className="col-span-2 row-start-3 flex flex-col gap-2 lg:col-span-1 lg:col-start-2 lg:row-start-2">
          <h5>User details</h5>
          <InfoParagraph header="Tips amount:">
            <span>{user.allTipsCount}</span>
          </InfoParagraph>
          <InfoParagraph header="Last tip value:">
            <span>no data</span>
          </InfoParagraph>
          <InfoParagraph header="Last tip transaction:">
            <span>no data</span>
          </InfoParagraph>
          <SocialLink
            href="https://youtube.com"
            socialMedium="youtube"
          />
          <SocialLink
            href="https://youtube.com"
            socialMedium="twitch"
          />
        </Card>
        <Card className="col-span-2 row-start-4">
          {tokenRes?.tokens && (
            <TokenPriceList
              tokens={tokenRes.tokens}
              className="w-full"
            />
          )}
        </Card>
      </MainContainer>
    </div>
  );
}
