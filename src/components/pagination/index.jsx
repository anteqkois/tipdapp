import React, { useEffect, useMemo, useState } from 'react';
import PaginationButton from './paginationButton';

const Pagination = ({
  pageCount,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 1,
  buttonsMargin = 1,
  renderOnZeroPageCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(pageCount);

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
    const buttonToShow = Array(pageRangeDisplayed)
      .fill(0)
      .map((_, i) => allPaginationButtons[i]);

    if (currentPage - 1 - buttonsMargin > pageRangeDisplayed)
      buttonToShow.push(
        <PaginationButton key={'dotsFirst'} onClick={() => handlePageChange(parseInt(currentPage / 2))}>
          ...
        </PaginationButton>,
      );

    buttonToShow.push(allPaginationButtons[currentPage - 2]);
    buttonToShow.push(allPaginationButtons[currentPage - 1]);
    buttonToShow.push(allPaginationButtons[currentPage]);

    if (currentPage + buttonsMargin < countPage - 1)
      buttonToShow.push(
        <PaginationButton key={'dotsSecond'} onClick={() => handlePageChange(parseInt((currentPage + countPage) / 2))}>
          ...
        </PaginationButton>,
      );

    buttonToShow.push(
      ...Array(pageRangeDisplayed)
        .fill(0)
        .map((_, i) => allPaginationButtons[countPage - i - 1]),
    );

    const uniqueIds = [];
    const uniqueButtons = buttonToShow
      .filter((button) => {
        if (!uniqueIds.includes(button?.key)) {
          uniqueIds.push(button?.key);
          return true;
        }
        return false;
      })
      .sort((a, b) => a.key - b.key);

    return uniqueButtons;
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
      {currentPage}
      <PaginationButton onClick={handlePreviousPage}>{previousLabel}</PaginationButton>
      <PaginationButtons />
      <PaginationButton onClick={handleNextPage}>{nextLabel}</PaginationButton>
    </div>
    // <div>
    //   {showedButton.map((element, index) => (
    //     <PaginationButton

    //       active={currentPage === element.content}
    //       key={index}
    //       onClick={() => {
    //         setCurrentPage(element.content);
    //         element.onClick();
    //       }}
    //     >
    //       {element.content}
    //     </PaginationButton>
    //   ))}
    //   <PaginationButton onClick={handleNextPage}>next page</PaginationButton>
    //   {/* {<PaginationButton></PaginationButton>}  */}
    // </div>
  );
};

export default Pagination;
