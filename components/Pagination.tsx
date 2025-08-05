"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages === 1) return null;
  return (
    <div
      className="flex justify-center items-center gap-2 my-4"
      role="navigation"
      aria-label="Pagination">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded border cursor-pointer hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label={`Go to previous page (page ${currentPage - 1})`}>
          Previous
        </button>
      )}

      <span aria-live="polite" className="px-2">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded border cursor-pointer hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-label={`Go to next page (page ${currentPage + 1})`}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
