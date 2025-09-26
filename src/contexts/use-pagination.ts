import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export interface PaginationState {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSorting: (sortBy: string, sortOrder: "asc" | "desc") => void;
  resetPagination: () => void;
  getSearchParams: () => URLSearchParams;
}

export interface UsePaginationOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
}

/**
 * Custom hook for managing pagination state with URL synchronization
 * Automatically syncs pagination state with URL search parameters
 * Persists state across page refreshes
 */
export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationResult {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    defaultSortBy,
    defaultSortOrder = "asc",
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  // Parse current state from URL parameters
  const currentState = useMemo(() => {
    const page = parseInt(searchParams.get("page") || String(defaultPage), 10);
    const pageSize = parseInt(
      searchParams.get("pageSize") || String(defaultPageSize),
      10
    );
    const sortBy = searchParams.get("sortBy") || defaultSortBy;
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || defaultSortOrder;

    return {
      page: isNaN(page) || page < 1 ? defaultPage : page,
      pageSize: isNaN(pageSize) || pageSize < 1 ? defaultPageSize : pageSize,
      sortBy,
      sortOrder,
    };
  }, [
    searchParams,
    defaultPage,
    defaultPageSize,
    defaultSortBy,
    defaultSortOrder,
  ]);

  // Update URL parameters while preserving other search params
  const updateSearchParams = useCallback(
    (updates: Partial<PaginationState>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        // Update pagination parameters
        if (updates.page !== undefined) {
          if (updates.page === defaultPage) {
            newParams.delete("page");
          } else {
            newParams.set("page", String(updates.page));
          }
        }

        if (updates.pageSize !== undefined) {
          if (updates.pageSize === defaultPageSize) {
            newParams.delete("pageSize");
          } else {
            newParams.set("pageSize", String(updates.pageSize));
          }
        }

        if (updates.sortBy !== undefined) {
          if (updates.sortBy === defaultSortBy || !updates.sortBy) {
            newParams.delete("sortBy");
          } else {
            newParams.set("sortBy", updates.sortBy);
          }
        }

        if (updates.sortOrder !== undefined) {
          if (updates.sortOrder === defaultSortOrder) {
            newParams.delete("sortOrder");
          } else {
            newParams.set("sortOrder", updates.sortOrder);
          }
        }

        return newParams;
      });
    },
    [
      setSearchParams,
      defaultPage,
      defaultPageSize,
      defaultSortBy,
      defaultSortOrder,
    ]
  );

  const setPage = useCallback(
    (page: number) => {
      updateSearchParams({ page });
    },
    [updateSearchParams]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      // When page size changes, reset to page 1
      updateSearchParams({ pageSize, page: 1 });
    },
    [updateSearchParams]
  );

  const setSorting = useCallback(
    (sortBy: string, sortOrder: "asc" | "desc") => {
      // When sorting changes, reset to page 1
      updateSearchParams({ sortBy, sortOrder, page: 1 });
    },
    [updateSearchParams]
  );

  const resetPagination = useCallback(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("page");
      newParams.delete("pageSize");
      newParams.delete("sortBy");
      newParams.delete("sortOrder");
      return newParams;
    });
  }, [setSearchParams]);

  const getSearchParams = useCallback(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);

  return {
    page: currentState.page,
    pageSize: currentState.pageSize,
    sortBy: currentState.sortBy,
    sortOrder: currentState.sortOrder,
    setPage,
    setPageSize,
    setSorting,
    resetPagination,
    getSearchParams,
  };
}
