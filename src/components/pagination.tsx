import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@kit/components/ui/pagination";

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

interface PaginationControlsProps {
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
}


export function PaginationControls({ paginationData, onPageChange }: PaginationControlsProps) {
  const {
    currentPage,
    totalPages,
    // totalItems,
    // pageSize,
  } = paginationData;

  // Calculate page range to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side
    const range = [];
    const rangeWithDots = [];

    for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

  // const startItem = (currentPage - 1) * pageSize + 1;
  // const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
      <div className="flex items-center justify-between ">
        {/*<div className="text-xs text-muted-foreground">*/}
        {/*    Showing {startItem} to {endItem} of {totalItems} entries*/}
        {/*</div>*/}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, idx) => (
                <PaginationItem key={idx}>
                  {pageNum === '...' ? (
                      <span className="px-3 py-2">...</span>
                  ) : (
                      <PaginationLink
                          onClick={() => onPageChange(pageNum as number)}
                          isActive={pageNum === currentPage}
                          className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                  )}
                </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
  );
}