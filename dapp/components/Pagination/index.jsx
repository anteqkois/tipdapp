import useMediaQuery from '@/hooks/useMediaQuery';
import React, { useCallback, useMemo, useRef } from 'react';
import PaginationButton from './PaginationButton';

const Pagination = ({
  pageAmount = 1,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 2,
  buttonsMarginPage = 1,
  renderOnZeroPageCount = false,
}) => {
  const currentPage = useRef(1);

  const isMobile = useMediaQuery('(max-width: 640px)', true);

  if (isMobile) {
    previousLabel = '<';
    nextLabel = '>';
    // pageRangeDisplayed = 1;
    buttonsMarginPage = 1;
  }

  const countPage = useMemo(() => Math.ceil(pageAmount), [pageAmount]);

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
    [countPage],
  );

  const PaginationButtons = useCallback(() => {
    const buttonToShow = [];

    //show all buttons ?
    if (countPage <= pageRangeDisplayed) {
      buttonToShow.push(...allPaginationButtons);
    } else {
      // Generate beginning of buttons
      buttonToShow.push(
        ...Array(pageRangeDisplayed)
          .fill(0)
          .map((_, i) => allPaginationButtons[i]),
      );

      // Generate first ... button
      if (currentPage.current - 1 - buttonsMarginPage > pageRangeDisplayed)
        buttonToShow.push(
          <PaginationButton
            key={Math.ceil(currentPage.current / 2)}
            onClick={() => handlePageChange(Math.ceil(currentPage.current / 2))}
          >
            ...
          </PaginationButton>,
        );

      // Generate the central part of buttons
      buttonToShow.push(
        ...Array(buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current - 2 - i]),
      );
      buttonToShow.push(allPaginationButtons[currentPage.current - 1]);
      buttonToShow.push(
        ...Array(buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current + i]),
      );

      // Generate second ...button
      if (currentPage.current + buttonsMarginPage < countPage - 1)
        buttonToShow.push(
          <PaginationButton
            key={Math.ceil((currentPage.current + countPage) / 2)}
            onClick={() => handlePageChange(Math.ceil((currentPage.current + countPage) / 2))}
          >
            ...
          </PaginationButton>,
        );

      // Generate ending of buttons
      buttonToShow.push(
        ...Array(pageRangeDisplayed)
          .fill(0)
          .map((_, i) => allPaginationButtons[countPage - i - 1]),
      );
    }

    // Remove repeating  buttons
    const uniqueIds = [];
    return buttonToShow
      .map((button) => {
        if (!uniqueIds.includes(button?.key)) {
          uniqueIds.push(button?.key);
          if (button?.key == currentPage.current) {
            return (
              <PaginationButton
                active
                key={button.key}
                onClick={() => {
                  handlePageChange(button.key);
                }}
              >
                {button.key}
              </PaginationButton>
            );
          }
          return button;
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.key - b.key);
  }, [countPage, currentPage.current, buttonsMarginPage, pageRangeDisplayed]);

  const handlePageChange = (page) => {
    if (parseInt(page) !== currentPage.current) {
      currentPage.current = parseInt(page);
      onPageChange(parseInt(page));
    }
  };

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

  return (
    (countPage > 1 || renderOnZeroPageCount) && (
      <div>
        <PaginationButton onClick={handlePreviousPage}>{previousLabel}</PaginationButton>
        <PaginationButtons />
        <PaginationButton onClick={handleNextPage}>{nextLabel}</PaginationButton>
      </div>
    )
  );
};

export default Pagination;