'use client';

import { usePageFindByAffixUrl } from '@/modules/Page/hooks/usePageQuery';
import { TipForm } from '@/modules/Tip/containers/TipForm';
import { TokenPriceList } from '@/modules/Token/components/TokenPriceList';
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
  const { data: pageData } = usePageFindByAffixUrl({
    params,
  });

  const activeTokensSymbol = ['sand', 'shiba', 'bnb'];

  // const { data: tokensData } = useTokenGetDetails({
  //   tokenSymbol: activeTokensSymbol,
  // });
  const tokensData = [
    {
      id: 'the-sandbox',
      symbol: 'sand',
      name: 'The Sandbox',
      image:
        'https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1597397942',
      current_price: 0.745101,
      market_cap: 1192349341,
      market_cap_rank: 45,
      fully_diluted_valuation: 2253213141,
      total_volume: 165661121,
      high_24h: 0.777536,
      low_24h: 0.715386,
      price_change_24h: 0.02279693,
      price_change_percentage_24h: 3.15614,
      market_cap_change_24h: 37930750,
      market_cap_change_percentage_24h: 3.2857,
      circulating_supply: 1587532026.2233226,
      total_supply: 3000000000,
      max_supply: 3000000000,
      ath: 8.4,
      ath_change_percentage: -91.05642,
      ath_date: '2021-11-25T06:04:40.957Z',
      atl: 0.02897764,
      atl_change_percentage: 2491.56328,
      atl_date: '2020-11-04T15:59:14.441Z',
      roi: null,
      last_updated: '2023-01-28T11:59:18.939Z',
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
      current_price: 1,
      market_cap: 67571120596,
      market_cap_rank: 3,
      fully_diluted_valuation: 67571120596,
      total_volume: 40394981163,
      high_24h: 1.003,
      low_24h: 0.99498,
      price_change_24h: -0.000173099946927824,
      price_change_percentage_24h: -0.0173,
      market_cap_change_24h: 195685155,
      market_cap_change_percentage_24h: 0.29044,
      circulating_supply: 67504444776.4858,
      total_supply: 67504444776.4858,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.41394,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.67929,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2023-01-28T11:55:27.013Z',
    },
    {
      id: 'shiba-inu',
      symbol: 'shib',
      name: 'Shiba Inu',
      image:
        'https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446',
      current_price: 0.00001196,
      market_cap: 7069723914,
      market_cap_rank: 15,
      fully_diluted_valuation: null,
      total_volume: 373186779,
      high_24h: 0.00001227,
      low_24h: 0.00001146,
      price_change_24h: 4.21875e-7,
      price_change_percentage_24h: 3.65507,
      market_cap_change_24h: 259920336,
      market_cap_change_percentage_24h: 3.81686,
      circulating_supply: 589367753875271.1,
      total_supply: 999990968807043,
      max_supply: null,
      ath: 0.00008616,
      ath_change_percentage: -86.09132,
      ath_date: '2021-10-28T03:54:55.568Z',
      atl: 5.6366e-11,
      atl_change_percentage: 21260000.42586,
      atl_date: '2020-11-28T11:26:25.838Z',
      roi: null,
      last_updated: '2023-01-28T11:59:44.542Z',
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image:
        'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
      current_price: 307.43,
      market_cap: 41482423516,
      market_cap_rank: 5,
      fully_diluted_valuation: 61496222642,
      total_volume: 652349541,
      high_24h: 313.26,
      low_24h: 301.95,
      price_change_24h: 2.55,
      price_change_percentage_24h: 0.83566,
      market_cap_change_24h: 296000223,
      market_cap_change_percentage_24h: 0.71868,
      circulating_supply: 134910476.56,
      total_supply: 157219628.63,
      max_supply: 200000000,
      ath: 686.31,
      ath_change_percentage: -55.25452,
      ath_date: '2021-05-10T07:24:17.097Z',
      atl: 0.0398177,
      atl_change_percentage: 771143.03965,
      atl_date: '2017-10-19T00:00:00.000Z',
      roi: null,
      last_updated: '2023-01-28T11:58:57.114Z',
    },
  ];

  const { page, user } = pageData!;

  return (
    <div className="bg-[url('/wave.svg')] bg-no-repeat bg-cover bg-center w-screen h-screen">
      <MainContainer className="grid gap-2 grid-cols-[7fr_3fr] ">
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
        <Card className="row-start-4 col-span-2">
          <TokenPriceList
            tokens={tokensData}
            className="w-full"
          />
        </Card>
      </MainContainer>
    </div>
  );
}
