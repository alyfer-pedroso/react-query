import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "./ui/button";

interface PaginationProps {
  items: number;
  page: number;
  pages: number;
}

export function Pagination({ items, page, pages }: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams((params) => {
      params.set("page", "1");
      return params;
    });
  }

  function prevPage() {
    if (page - 1 <= 0) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page - 1));
      return params;
    });
  }

  function nextPage() {
    if (page >= pages) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page + 1));
      return params;
    });
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set("page", String(pages));
      return params;
    });
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-500">
      <span>Showing 10 of {items} items</span>
      <div className="flex items-center gap-8">
        <span>
          Page {page} of {pages}
        </span>

        <div className="space-x-1.5">
          <Button size="icon" disabled={page === 1} onClick={firstPage}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button size="icon" disabled={page === 1} onClick={prevPage}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button size="icon" disabled={page === pages} onClick={nextPage}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button size="icon" disabled={page === pages} onClick={lastPage}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
