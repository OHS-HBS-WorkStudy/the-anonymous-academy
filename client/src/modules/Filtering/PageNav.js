import React, { useState, useEffect } from 'react';

const PageNavigation = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const calculateVisiblePages = () => {
      const pages = [];
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const middle = Math.ceil(maxVisiblePages / 2);

        if (currentPage <= middle) {
          for (let i = 1; i <= maxVisiblePages; i++) {
            pages.push(i);
          }
          if (totalPages > maxVisiblePages) {
            pages.push('...');
            pages.push(totalPages);
          }
        } else if (currentPage >= totalPages - middle + 1) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - Math.floor(middle / 2); i <= currentPage + Math.floor((maxVisiblePages - 1) / 2); i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      setVisiblePages(pages);
    };

    calculateVisiblePages();
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePageClick = (page) => {
    if (typeof page === 'number') {
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
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              className={`pagination-button number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ) : (
            <span className="pagination-ellipsis">{page}</span>
          )}
        </React.Fragment>
      ))}
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