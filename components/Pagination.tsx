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
    <div className="flex justify-center items-center gap-2 my-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded border cursor-pointer">
          Previous
        </button>
      )}
      {currentPage}/{totalPages}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded border cursor-pointer">
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
