'use client';

import { formatDateBasic } from '@/lib/dayjs';

export default function Page() {
  return (
    <div>
      <span />
      {formatDateBasic(new Date(1671662029 * 1000))}
    </div>
  );
}
