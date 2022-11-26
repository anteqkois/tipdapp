'use client';
import Pagination from '@/components/Pagination';
import { TipsList } from '@/components/Tip/TipsList';
import { Card } from '@/components/utils';
import { useTipsPaginated } from '@/hooks';
import { useState } from 'react';

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Tips = () => {
  //TODO get page from URL
  //TODO create global settings store to store information about default tips view for user
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data } = useTipsPaginated({ page, pageSize });

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
};

export default Tips;
