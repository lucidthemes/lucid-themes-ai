import { PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface ListControlPaginationNumbersProps {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  pageLimitExceeded?: boolean;
  pageLimit?: number;
}

export default function ListControlPaginationNumbers({
  handlePageChange,
  currentPage,
  totalPages,
  pageLimitExceeded,
  pageLimit = 10,
}: ListControlPaginationNumbersProps) {
  const pageNumbers = [];

  if (!pageLimitExceeded) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (pageLimitExceeded) {
    let lowerLimit;

    // check not first page
    if (Number(currentPage) > 1) {
      // check current page is less that total pages minus the page limit (10) minus 2 (first and last page numbers)
      // this keeps the range of pages to a total of page limit minus 2 (8)
      if (currentPage < totalPages - pageLimit + 2) {
        lowerLimit = Number(currentPage);
      } else {
        // current page is greater, so set the lower limit to total pages minus page limit minus 2
        lowerLimit = totalPages - pageLimit + 2;
      }
    } else {
      // first page
      lowerLimit = Number(currentPage) + 1;
    }

    // set higher limit to lower limit plus page limit (10) minus 3 (first, last, and current page numbers)
    const higherLimit = lowerLimit + (pageLimit - 3);

    for (let i = lowerLimit; i <= higherLimit; i++) {
      pageNumbers.push(i);
    }
  }

  if (pageNumbers.length === 0) return;

  return pageNumbers.map((pageNumber) => {
    const isActive = Number(currentPage) === Number(pageNumber) ? true : false;

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink onClick={() => handlePageChange(pageNumber)} className="cursor-pointer" isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });
}
