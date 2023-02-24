'use client';

import { apiClient } from '@tipdapp/api';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    (async () => {
      const data = await apiClient.page.findByAffixUrl({
        params: { affixUrl: 'anteqkois', role: 'streamer' },
      });
      console.log('data :>> ', data);
    })();
  }, []);

  return <button type="button">set cookie</button>;
}
