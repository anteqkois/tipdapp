import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTipsByUser, STATUS, selectTipsPerPage, setCurrentPage } from 'src/redux/tipSlice';
import ReactPaginate from 'react-paginate';
import Tip from '@/components/tip/tip';
import Card from '@/components/utils/Card';
import Button from '@/components/utils/Button';
import Spinner from '@/components/utils/Spinner';
// import Pagination from '@/components/pagination';

const tipsData = [
  {
    txHash: '0x05f40c178a69696d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '789356000000000000000000',
    value: '80000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: true,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'SHIB',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'rudy56',
  },
  {
    txHash: '0xmd865c178a69696d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '45000000000000000',
    value: '280000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: true,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'ETH',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'any2356',
  },
  ,
  {
    txHash: '0x92hbv6sasdcass6d31ed6bd4ae72ec2655840c915e9e1f19f25f470e1cb4b26a',
    tokenAmount: '10000000000000000000',
    value: '280000000000000000000',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo provident error sunt? Voluptate atque, nihil illum voluptates autem, dolores tempora nisi aperiam aut iusto sunt debitis eveniet, eligendi laboriosam.',
    showed: false,
    date: '17 March 2022; 21.15',
    userWalletAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    cryptocurrencyAddress: '0xd6454929839ff72b9db63aee5d6d08779bdb82e7',
    symbol: 'ATOM',
    tipperWalletAddress: '0xbaea370e859a7c6caaf6967e49c255b050c58c30',
    nick: 'anteqkois',
  },
];

const tips = () => {
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(2);
  // const [itemOffset, setItemOffset] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(2);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipsByUser({ userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d', page: 0 }));
  }, []);

  // const data = useSelector(tipsSelectors.selectAll);
  const status = useSelector((state) => state.tips.status);

  //useMemo or useCalbackl
  const tips = useSelector(selectTipsPerPage);
  console.log(tips);

  const handlePageChange = (event) => {
    console.log(event.selected);
    dispatch(getTipsByUser({ userWalletAddress: '0x4302c27398994a37d1cae83e5b49e40de9e3658d', page: event.selected }));
    // dispatch(setCurrentPage(event.selected));
  };

  return (
    <section>
      <Card className="flex flex-col lg:p-8">
        <h5 className="pb-4">Your tips:</h5>
        <span className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
        {status === STATUS.SUCCEEDED ? (
          <>
            <ul>
              {tips.map((tip) => (
                <li key={tip.txHash} className="w-full">
                  <Tip {...tip} />
                  <div className="w-[calc(100%+2rem)] -mx-4 bg-neutral-300 h-[1.5px] lg:w-[calc(100%+4rem)] lg:-mx-8" />
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center pt-4 text-lg">
              <ReactPaginate
                // breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                // renderOnZeroPageCount={null}
              />
              {/* <Pagination
                elements={[
                  { content: 1, onClick: () => handleMoreTips(1) },
                  { content: 2, onClick: () => handleMoreTips(2) },
                  { content: 3, onClick: () => handleMoreTips(3) },
                  { content: 4, onClick: () => handleMoreTips(4) },
                  { content: 5, onClick: () => handleMoreTips(5) },
                ]}
              /> */}
              {/* <div className="flex gap-1 py-2 items-center">
                <Button type="minimalist">See more your's tips</Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline ml-1 w-4 h-4 mt-2 fill-neutral-700 cursor-pointer rotate-90"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 16v4l8-8-8-8v4h-8.929c-9.059 0-7.134 9.521-6.334 11.418.788-2.445 2.464-3.418 5.371-3.418h9.892z" />
                </svg>
              </div> */}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </Card>
    </section>
  );
};

export default tips;
