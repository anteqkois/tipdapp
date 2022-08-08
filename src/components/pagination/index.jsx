import React, { useEffect, useMemo, useState } from 'react';
import PaginationButton from './paginationButton';

const Pagination = ({
  pageCount,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 2,
  //TODO! not work buttonsMarginPage
  buttonsMarginPage = 1,
  renderOnZeroPageCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(Math.ceil(pageCount));

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

  const PaginationButtons = () => {
    if (countPage <= pageRangeDisplayed) {
      return allPaginationButtons;
    }

    // Generate beginning of buttons
    const buttonToShow = Array(pageRangeDisplayed)
      .fill(0)
      .map((_, i) => allPaginationButtons[i]);

    // Generate first ...
    console.log(currentPage - 1 - buttonsMarginPage > pageRangeDisplayed);
    console.log(currentPage - 1 - buttonsMarginPage );
    console.log(pageRangeDisplayed);
    console.log(Math.ceil(currentPage / 2));
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
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    currentPage > 1 && setCurrentPage((prev) => --prev);
  };

  const handleNextPage = () => {
    currentPage < pageCount && setCurrentPage((prev) => ++prev);
  };

  return (
    <div>
      {/* {currentPage} */}
      <PaginationButton onClick={handlePreviousPage}>{previousLabel}</PaginationButton>
      <PaginationButtons />
      <PaginationButton onClick={handleNextPage}>{nextLabel}</PaginationButton>
    </div>
  );
};

export default Pagination;
