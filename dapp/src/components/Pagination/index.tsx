import useMediaQuery from '@/hooks/useMediaQuery';
import { Key, useCallback, useMemo, useRef } from 'react';
import PaginationButton from './PaginationButton';

type Props = {
  pageAmount: number;
  previousLabel?: string;
  nextLabel?: string;
  onPageChange: (newcurrentPage: number) => void;
  pageRangeDisplayed: number;
  buttonsMarginPage: number;
  renderOnZeroPageCount?: boolean;
};

const Pagination = ({
  pageAmount = 1,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 2,
  buttonsMarginPage = 1,
  renderOnZeroPageCount = false,
}: Props) => {
  const currentPage = useRef<number>(1);

  const isMobile = useMediaQuery('(max-width: 640px)', true);

  if (isMobile) {
    previousLabel = '<';
    nextLabel = '>';
    // pageRangeDisplayed = 1;
    buttonsMarginPage = 1;
  }

  const countPage = useMemo(() => Math.ceil(pageAmount), [pageAmount]);

  const handlePageChange = useCallback(
    (page: Key) => {
      if (Number(page) !== currentPage.current) {
        currentPage.current = Number(page);
        onPageChange(Number(page));
      }
    },
    [onPageChange]
  );

  const allPaginationButtons = useMemo(
    () =>
      Array(countPage)
        .fill(0)
        .map((_, i) => (
          <PaginationButton
            key={i}
            onClick={() => {
              handlePageChange(i);
            }}
          >
            {++i}
          </PaginationButton>
        )),
    [countPage, handlePageChange]
  );

  const paginationButtons = useMemo(() => {
    const buttonToShow: JSX.Element[] = [];

    //show all buttons ?
    if (countPage <= pageRangeDisplayed) {
      buttonToShow.push(...allPaginationButtons);
    } else {
      // Generate beginning of buttons
      buttonToShow.push(
        ...Array(pageRangeDisplayed)
          .fill(0)
          .map((_, i) => allPaginationButtons[i])
      );

      // Generate first ... button
      if (currentPage.current - 1 - buttonsMarginPage > pageRangeDisplayed)
        buttonToShow.push(
          <PaginationButton
            key={Math.ceil(currentPage.current / 2)}
            onClick={() => handlePageChange(Math.ceil(currentPage.current / 2))}
          >
            ...
          </PaginationButton>
        );

      // Generate the central part of buttons
      buttonToShow.push(
        ...Array(buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current - 2 - i])
      );
      buttonToShow.push(allPaginationButtons[currentPage.current - 1]);
      buttonToShow.push(
        ...Array(buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current + i])
      );

      // Generate second ...button
      if (currentPage.current + buttonsMarginPage < countPage - 1)
        buttonToShow.push(
          <PaginationButton
            key={Math.ceil((currentPage.current + countPage) / 2)}
            onClick={() =>
              handlePageChange(Math.ceil((currentPage.current + countPage) / 2))
            }
          >
            ...
          </PaginationButton>
        );

      // Generate ending of buttons
      buttonToShow.push(
        ...Array(pageRangeDisplayed)
          .fill(0)
          .map((_, i) => allPaginationButtons[countPage - i - 1])
      );
    }

    // Remove repeating  buttons
    const uniqueIds: Key[] = [];
    return buttonToShow
      .map((button) => {
        // if (!uniqueIds.includes(button?.key)) {
        if (button?.key) {
          if (!uniqueIds.includes(button.key)) {
            uniqueIds.push(button.key);
            if (button.key == currentPage.current) {
              return (
                <PaginationButton
                  active
                  key={button.key}
                  onClick={() => {
                    handlePageChange(button.key as Key);
                  }}
                >
                  {button.key}
                </PaginationButton>
              );
            }
            return button;
          }
        }
      })
      .filter(Boolean)
      .sort((a, b) => Number(a?.key) - Number(b?.key));
  }, [
    countPage,
    pageRangeDisplayed,
    allPaginationButtons,
    buttonsMarginPage,
    handlePageChange,
  ]);

  const handlePreviousPage = () => {
    if (currentPage.current > 1) {
      handlePageChange(currentPage.current - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage.current < countPage) {
      handlePageChange(currentPage.current + 1);
    }
  };

  return countPage > 1 || renderOnZeroPageCount ? (
    <div>
      <PaginationButton onClick={handlePreviousPage}>
        {previousLabel}
      </PaginationButton>
      {paginationButtons.map((button) => button)}
      <PaginationButton onClick={handleNextPage}>{nextLabel}</PaginationButton>
    </div>
  ) : null;
};

export default Pagination;
