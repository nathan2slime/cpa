import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePagination } from "./usePagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type PaginationProps = {
  total: number;
  current: number;
  limit: number;
};

export const PaginationComponent = ({
  current,
  limit,
  total,
}: PaginationProps) => {
  const { isCurrentPage, pages } = usePagination({
    current,
    limit,
    total,
  });

  console.log( total)

  const router = useRouter();
  const pathname = usePathname();

  const handlePage = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page, index) => {
          if (page === "...") {
            return <PaginationEllipsis key={index} />;
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(+page);
                }}
                isActive={isCurrentPage(+page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
