'use client';

import { useUserFind } from '@/shared/User/hooks/useTipsQuery';

type Props = {
  params: {
    nick: string;
  };
};

export default function Page({ params }: Props) {
  //TODO implement logic to handle multiple pages from one user. or in default, show streamer page

  //TODO fetch all data about given user ?
  // const { data } = usePageFind({ nick: params.nick });
  const { data } = useUserFind({
    queryParams: {
      nick: 'anteqkois',
      include: ['avatar', 'streamer', 'tipper', 'tips', 'userToken'],
    },
  });
  
  console.log(data);

  // useEffect(() => {
  //   (async () => {
  //     const res = await api.get('/user', {
  //       // params: { include: { tipper: 'true', streamer: 'true' } },
  //       params: { include: ['tipper', 'streamer'] },
  //     });
  //   })();
  // }, []);

  // data?.pages
  // console.log(JSON.stringify(data));

  // if streamer => show streamer page
  // return <p>{JSON.stringify(data)}</p>;
  return (
    <main>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quod
      officiis dignissimos! Sunt aperiam ad explicabo facere, minus ducimus
      quasi iure fugit cupiditate alias officiis cum assumenda inventore nobis
      voluptas!
    </main>
  );
}
