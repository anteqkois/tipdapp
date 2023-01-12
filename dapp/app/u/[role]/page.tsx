'use client';

import { Role } from '@tipdapp/server';

type Props = {
  params: {
    role: Role;
  };
};

export default function Page({ params }: Props) {
  return <main>Show all page connected to given role</main>;
}
