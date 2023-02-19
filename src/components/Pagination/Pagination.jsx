import cx from 'classnames';
import React from 'react';

import { ReactComponent as LeftIcon } from '../../assets/icons/left.svg';

import styles from './Pagination.module.scss';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

const DOTS = '...';

export const Pagination = ({ limit = 9, total = 120, offset = 1, onChange }) => {
  const currentPage = Math.floor(offset / limit);

  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(total / limit);

    if (totalPageCount <= 6) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 5);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPageCount - 4, totalPageCount);
      return [1, DOTS, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, DOTS, ...middleRange, DOTS, totalPageCount];
  }, [total, limit, currentPage]);

  const handleClick = (value) => () => {
    onChange((value - 1) * limit);
  };

  if (total <= limit) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        disabled={currentPage === 0}
        className={cx(styles.button, styles.arrow)}
        onClick={handleClick(currentPage)}
      >
        <LeftIcon />
      </button>
      {paginationRange.map((value) => (value === DOTS ? (
        <span key={value} className={cx(styles.button, styles.dots)}>...</span>
      ) : (
        <button
          key={value}
          type="button"
          className={cx(styles.button, { [styles.active]: value - 1 === currentPage })}
          onClick={handleClick(value)}
        >
          {value}
        </button>
      )))}
      <button
        type="button"
        disabled={(currentPage + 1) * limit > total}
        className={cx(styles.button, styles.arrow)}
        onClick={handleClick(currentPage + 2)}
      >
        <LeftIcon />
      </button>
    </div>
  );
};
