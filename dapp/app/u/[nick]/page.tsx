'use client';

import { usePageFind } from '@/modules/Page/hooks/usePage';

type Props = {
  params: {
    nick: string;
  };
};

export default function Page({ params }: Props) {
  //TODO implement logic to handle multiple pages from one user. or in default, show streamer page

  const { data } = usePageFind({ nick: params.nick });

  // if streamer => show streamer page
  return <p>{JSON.stringify(data)}</p>;
}
