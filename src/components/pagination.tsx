"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@core/components/ui/pagination";
import { PaginatedData } from "@private/domain";

interface PaginationControllerProps<T> {
  data: PaginatedData<T>;
  onPageChange: (page: number) => void;
  maxPageButtons?: number; // how many numbered buttons to show
}

export function PaginationController<T>({
  data,
  onPageChange,
  maxPageButtons = 5,
}: PaginationControllerProps<T>) {
  const { page, pageSize, total, hasNext, hasPrevious } = data;

  const totalPages = Math.ceil(total / pageSize);

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);

    if (start === 1) {
      end = maxPageButtons - 1;
    } else if (end === totalPages) {
      start = totalPages - (maxPageButtons - 2);
    }

    const pages: (number | "ellipsis")[] = [];
    if (start > 1) {
      pages.push(1, "ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      pages.push("ellipsis", totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevious) onPageChange(page - 1);
            }}
            aria-disabled={!hasPrevious}
            className={!hasPrevious ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>

        {/* Page number buttons */}
        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (hasNext) onPageChange(page + 1);
            }}
            aria-disabled={!hasNext}
            className={!hasNext ? "opacity-50 pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}