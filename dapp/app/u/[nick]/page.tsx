'use client';

import { usePageFind } from '@/hooks/usePage';

type Props = {
  params: {
    nick: string;
  };
};

export default function Page({ params }: Props) {
  //TODO implement logic to handle multiple pages from on user. or in defaukt show streamer page

  const { data } = usePageFind({ nick: params.nick });
  // useEffect(() => {
  //   ()
  //   const page = await find({ nick: params.nick });
  // }, []);

  // if streamer => show streamer page
  return <p>{ JSON.stringify(data)}</p>;
}
