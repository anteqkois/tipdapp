import React, { useMemo, useState } from 'react';
import PaginationButton from './paginationButton';

const Pagination = ({
  pageCount,
  previousLabel,
  nextLabel,
  onPageChange,
  pageRangeDisplayed,
  renderOnZeroPageCount,
  buttonsMargin = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(pageCount);
  // const [showedButton, setShowedButton] = useState(elements.slice(0, 4));
  // const id = useId();

  const allPaginationButtons = useMemo(
    () =>
      Array(countPage)
        .fill(0)
        .map((_, i) => (
          <PaginationButton
            key={i}
            onClick={() => {
              onPageChange(i);
              setCurrentPage(i);
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

    // <PaginationButton key={'...'} onClick={() => onPageChange()}>
    //   ...
    // </PaginationButton>,

    buttonToShow.push(allPaginationButtons[currentPage - 2]);
    buttonToShow.push(allPaginationButtons[currentPage - 1]);
    buttonToShow.push(allPaginationButtons[currentPage]);

    buttonToShow.push(
      ...Array(pageRangeDisplayed)
        .fill(0)
        .map((_, i) => allPaginationButtons[countPage - i - 1]),
    );

    console.log(buttonToShow);

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

  const handleNextPage = () => {
    // elements[currentPage + 1].onClick();
    // setCurrentPage((prev) => prev++);
  };

  return (
    <div>
      {currentPage}
      <PaginationButton>{previousLabel}</PaginationButton>
      <PaginationButtons />
      <PaginationButton>{nextLabel}</PaginationButton>
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
