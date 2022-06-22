import React, { useId, useState } from 'react';
import PaginationButton from './paginationButton';

const Pagination = ({ elements }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showedButton, setShowedButton] = useState(elements.slice(0, 4));
  // const id = useId();

  const handleNextPage = () => {
    elements[currentPage + 1].onClick();
    setCurrentPage((prev) => prev++);
  };

  return (
    <div>
      {showedButton.map((element, index) => (
        <PaginationButton
          active={currentPage === element.content}
          key={index}
          onClick={() => {
            setCurrentPage(element.content);
            element.onClick();
          }}
        >
          {element.content}
        </PaginationButton>
      ))}
      <PaginationButton onClick={handleNextPage}>next page</PaginationButton>
      {/* {<PaginationButton></PaginationButton>}  */}
    </div>
  );
};

export default Pagination;
