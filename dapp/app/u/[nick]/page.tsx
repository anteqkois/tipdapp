'use client';

import { usePageFind } from '@/modules/Page/hooks/usePageQuery';

type Props = {
  params: {
    nick: string;
  };
};

export default function Page({ params }: Props) {
  //TODO implement logic to handle multiple pages from one user. or in default, show streamer page

  //TODO fetch all data about given user ?
  // const { data } = usePageFind({ nick: params.nick });
  // data?.pages
  console.log(JSON.stringify(data));

  // if streamer => show streamer page
  return <p>{JSON.stringify(data)}</p>;
}
