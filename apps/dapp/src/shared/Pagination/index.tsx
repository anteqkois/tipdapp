import { useMediaQuery } from '@/shared/hooks';
import { Key, useCallback, useMemo, useRef } from 'react';
import {PaginationButton} from './PaginationButton';

type Props = {
  count: number;
  pageSize: number;
  previousLabel?: string;
  nextLabel?: string;
  onPageChange: (newcurrentPage: number) => void;
  pageRangeDisplayed: number;
  buttonsMarginPage: number;
  renderOnZeroPageCount?: boolean;
};

const Pagination = ({
  count,
  pageSize,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  pageRangeDisplayed = 2,
  buttonsMarginPage = 1,
  renderOnZeroPageCount = false,
}: Props) => {
  const currentPage = useRef<number>(1);

  const isMobile = useMediaQuery<boolean>(['(max-width: 640px)'], [true], true);

  const settings = useMemo(
    () =>
      isMobile
        ? {
            previousLabel: '<',
            nextLabel: '>',
            pageRangeDisplayed: 1,
            buttonsMarginPage: 1,
          }
        : {
            previousLabel,
            nextLabel,
            pageRangeDisplayed,
            buttonsMarginPage,
          },
    [buttonsMarginPage, isMobile, nextLabel, pageRangeDisplayed, previousLabel]
  );

  const countPage = useMemo(
    () => Math.ceil(count / pageSize),
    [count, pageSize]
  );

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
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            onClick={() => {
              handlePageChange(i);
            }}
          >
            {
              // eslint-disable-next-line no-plusplus, no-param-reassign
              ++i
            }
          </PaginationButton>
        )),
    [countPage, handlePageChange]
  );

  const paginationButtons = useMemo(() => {
    const buttonToShow: JSX.Element[] = [];

    // show all buttons ?
    if (countPage <= settings.pageRangeDisplayed) {
      buttonToShow.push(...allPaginationButtons);
    } else {
      // Generate beginning of buttons
      buttonToShow.push(
        ...Array(settings.pageRangeDisplayed)
          .fill(0)
          .map((_, i) => allPaginationButtons[i])
      );

      // Generate first ... button
      if (
        currentPage.current - 1 - settings.buttonsMarginPage >
        settings.pageRangeDisplayed
      )
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
        ...Array(settings.buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current - 2 - i])
      );
      buttonToShow.push(allPaginationButtons[currentPage.current - 1]);
      buttonToShow.push(
        ...Array(settings.buttonsMarginPage)
          .fill(0)
          .map((_, i) => allPaginationButtons[currentPage.current + i])
      );

      // Generate second ...button
      if (currentPage.current + settings.buttonsMarginPage < countPage - 1)
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
        ...Array(settings.pageRangeDisplayed)
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
            if (button.key === currentPage.current.toString()) {
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
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => Number(a?.key) - Number(b?.key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage.current,
    countPage,
    settings.pageRangeDisplayed,
    allPaginationButtons,
    settings.buttonsMarginPage,
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
        {settings.previousLabel}
      </PaginationButton>
      {paginationButtons.map((button) => button)}
      <PaginationButton onClick={handleNextPage}>
        {settings.nextLabel}
      </PaginationButton>
    </div>
  ) : null;
};

export { Pagination };
