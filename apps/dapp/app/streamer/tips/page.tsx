'use client';

import { TipsList } from '@/modules/Tip/containers/TipsList';
import { useTipsFindPaginated } from '@/modules/Tip/hooks/useTipsQuery';
import { Pagination } from '@/shared/Pagination';
import { Card } from '@/shared/ui';
import { useState } from 'react';

// TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
function Tips() {
  // TODO get page from URL
  // TODO create global settings store to store information about default tips view for user
  const [pageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data } = useTipsFindPaginated({ page, pageSize });

  return (
    <section>
      <Card className="flex flex-col ">
        <h4 className="pb-4">Your tips:</h4>
        <TipsList
          tips={data?.tips!}
          tipView="Card"
        />

        <div className="flex items-center justify-center pt-4 text-lg">
          <Pagination
            onPageChange={setPage}
            pageRangeDisplayed={2}
            buttonsMarginPage={2}
            count={data?.count!}
            pageSize={pageSize}
          />
        </div>
      </Card>
    </section>
  );
}

export default Tips;
