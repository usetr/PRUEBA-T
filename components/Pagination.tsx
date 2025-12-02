import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-8">
      <Link
        href={hasPrev ? `/?page=${currentPage - 1}` : '#'}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
          hasPrev
            ? "bg-white text-gray-800 shadow-md hover:shadow-lg hover:bg-simpsons-yellow"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
        aria-disabled={!hasPrev}
        tabIndex={!hasPrev ? -1 : undefined}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </Link>

      <span className="font-bold text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={hasNext ? `/?page=${currentPage + 1}` : '#'}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
          hasNext
            ? "bg-white text-gray-800 shadow-md hover:shadow-lg hover:bg-simpsons-yellow"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
        aria-disabled={!hasNext}
        tabIndex={!hasNext ? -1 : undefined}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
