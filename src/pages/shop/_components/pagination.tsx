import { times } from 'lodash';
import React, { memo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Math.ceil(totalPages / 6); // Tính toán số lượng trang

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pages) {
      onPageChange(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderButton = (current: number) => {
    return times(pages, (index) => (
      <button
        type="button"
        onClick={() => {
          handlePageChange(index + 1);
        }}
        key={index}
      >
        <span
          className={`custom-bg-brown ml-6 px-3 py-1 text-black ${
            current === index + 1 ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {index + 1}
        </span>
      </button>
    ));
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <nav className="my-4 inline-flex">
        <button
          type="button"
          className={`custom-bg-red ml-6 rounded-l-md px-6 py-1 text-black ${
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:custom-bg-dark'
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {renderButton(currentPage)}

        <button
          type="button"
          className={`custom-bg-red ml-6 rounded-r-md px-6 py-1 text-black ${
            currentPage === pages
              ? 'cursor-not-allowed bg-gray-300'
              : 'hover:custom-bg-dark bg-blue-500 text-black'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
};

export default memo(Pagination);
