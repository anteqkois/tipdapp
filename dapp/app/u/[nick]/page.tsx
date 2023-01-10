'use client';

import api from '@/api/apiConfig';
import { useEffect } from 'react';

type Props = {
  params: {
    nick: string;
  };
};

export default function Page({ params }: Props) {
  //TODO implement logic to handle multiple pages from one user. or in default, show streamer page

  //TODO fetch all data about given user ?
  // const { data } = usePageFind({ nick: params.nick });
  useEffect(() => {
    (async () => {
      const res = await api.get('/user', {
        // params: { include: { tipper: 'true', streamer: 'true' } },
        params: { include: ['tipper', 'streamer'] },
      });
    })();
  }, []);

  // data?.pages
  // console.log(JSON.stringify(data));

  // if streamer => show streamer page
  // return <p>{JSON.stringify(data)}</p>;
  return (
    <p>
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
    </p>
  );
}
