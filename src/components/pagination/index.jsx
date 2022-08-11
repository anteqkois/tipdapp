import useMediaQuery from '@/hooks/useMediaQuery';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PaginationButton from './paginationButton';

const Pagination = ({
  pageAmount = 1,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 2,
  buttonsMarginPage = 1,
  renderOnZeroPageCount = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useMediaQuery('(max-width: 640px)', true);

  if (isMobile) {
    previousLabel = '<';
    nextLabel = '>';
    pageRangeDisplayed = 1;
    buttonsMarginPage = 0;
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

  //TODO! active class not work when 1 or 2 page
  const PaginationButtons = useCallback(() => {
    if (countPage <= pageRangeDisplayed) {
      return allPaginationButtons;
    }

    // Generate beginning of buttons
    const buttonToShow = Array(pageRangeDisplayed)
      .fill(0)
      .map((_, i) => allPaginationButtons[i]);

    // Generate first ...
    if (currentPage - 1 - buttonsMarginPage > pageRangeDisplayed)
      buttonToShow.push(
        <PaginationButton key={Math.ceil(currentPage / 2)} onClick={() => handlePageChange(Math.ceil(currentPage / 2))}>
          ...
        </PaginationButton>,
      );

    // Generate the central part of buttons
    buttonToShow.push(
      ...Array(buttonsMarginPage)
        .fill(0)
        .map((_, i) => allPaginationButtons[currentPage - 2 - i]),
    );
    buttonToShow.push(allPaginationButtons[currentPage - 1]);
    buttonToShow.push(
      ...Array(buttonsMarginPage)
        .fill(0)
        .map((_, i) => allPaginationButtons[currentPage + i]),
    );

    // Generate second ...
    if (currentPage + buttonsMarginPage < countPage - 1)
      buttonToShow.push(
        <PaginationButton
          key={parseInt((currentPage + countPage) / 2)}
          onClick={() => handlePageChange(parseInt((currentPage + countPage) / 2))}
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

    // Remove repeating  buttons
    const uniqueIds = [];
    return buttonToShow
      .map((button) => {
        if (!uniqueIds.includes(button?.key)) {
          uniqueIds.push(button?.key);
          if (button?.key == currentPage) {
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
  }, [countPage, currentPage, buttonsMarginPage, pageRangeDisplayed]);

  // const PaginationButtons = () => {
  //   if (countPage <= pageRangeDisplayed) {
  //     return allPaginationButtons;
  //   }

  //   // Generate beginning of buttons
  //   const buttonToShow = Array(pageRangeDisplayed)
  //     .fill(0)
  //     .map((_, i) => allPaginationButtons[i]);

  //   // Generate first ...
  //   if (currentPage - 1 - buttonsMarginPage > pageRangeDisplayed)
  //     buttonToShow.push(
  //       <PaginationButton key={Math.ceil(currentPage / 2)} onClick={() => handlePageChange(Math.ceil(currentPage / 2))}>
  //         ...
  //       </PaginationButton>,
  //     );

  //   // Generate the central part of buttons
  //   buttonToShow.push(
  //     ...Array(buttonsMarginPage)
  //       .fill(0)
  //       .map((_, i) => allPaginationButtons[currentPage - 2 - i]),
  //   );
  //   buttonToShow.push(allPaginationButtons[currentPage - 1]);
  //   buttonToShow.push(
  //     ...Array(buttonsMarginPage)
  //       .fill(0)
  //       .map((_, i) => allPaginationButtons[currentPage + i]),
  //   );

  //   // Generate second ...
  //   if (currentPage + buttonsMarginPage < countPage - 1)
  //     buttonToShow.push(
  //       <PaginationButton
  //         key={parseInt((currentPage + countPage) / 2)}
  //         onClick={() => handlePageChange(parseInt((currentPage + countPage) / 2))}
  //       >
  //         ...
  //       </PaginationButton>,
  //     );

  //   // Generate ending of buttons
  //   buttonToShow.push(
  //     ...Array(pageRangeDisplayed)
  //       .fill(0)
  //       .map((_, i) => allPaginationButtons[countPage - i - 1]),
  //   );

  //   // Remove repeating  buttons
  //   const uniqueIds = [];
  //   return buttonToShow
  //     .map((button) => {
  //       if (!uniqueIds.includes(button?.key)) {
  //         uniqueIds.push(button?.key);

  //         // console.log(button?.key);
  //         // console.log(currentPage);
  //         // console.log(button?.key == currentPage);
  //         // console.log('------');
  //         if (button?.key == currentPage) {
  //           // console.log('first')
  //           return (
  //             <PaginationButton
  //               active
  //               key={button.key}
  //               onClick={() => {
  //                 handlePageChange(button.key);
  //               }}
  //             >
  //               {button.key}
  //             </PaginationButton>
  //           );
  //         }
  //         return button;
  //       }
  //     })
  //     .filter(Boolean)
  //     .sort((a, b) => a.key - b.key);
  // };
  // console.log(PaginationButtons);

  // useEffect(() => {
  // onPageChange(currentPage);
  // }, [currentPage]);

  const handlePageChange = (page) => {
    // console.log('1111');
    setCurrentPage(page);
    onPageChange(currentPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log('currentPage', currentPage);
    console.log('countPage', countPage);
    if (currentPage < countPage) {
      setCurrentPage((prev) => prev + 1);
      onPageChange(currentPage + 1);
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
