import React, { useMemo } from 'react';

const getVisiblePages = (current, total, maxVisible) => {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const half = Math.floor(maxVisible / 2);

  const showLeftEllipsis = current > half + 1;
  const showRightEllipsis = current < total - half;

  const start = Math.max(2, current - half);
  const end = Math.min(total - 1, current + half);

  pages.push(1);

  if (showLeftEllipsis) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (showRightEllipsis) pages.push('...');

  pages.push(total);

  return pages;
};

const PageNavigation = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  const visiblePages = useMemo(() => getVisiblePages(currentPage, totalPages, maxVisiblePages), [
    currentPage,
    totalPages,
    maxVisiblePages,
  ]);

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="modern-pagination">
      <button
        className="pagination-button prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {visiblePages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={`pagination-button number ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        )
      )}

      <button
        className="pagination-button next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default PageNavigation;
