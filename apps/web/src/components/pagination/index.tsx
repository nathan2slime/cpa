import { usePagination } from "./usePagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";

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
            <PaginationItem key={index} className="cursor-pointer">
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(+page);
                }}
                isActive={isCurrentPage(+page)}
              >
                {String(page)}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
