import { PaginationProps } from "@/components/pagination";

const generatePages = (page: number, totalPages: number) => {
  //menor número entre page e totalPages, garante que n é maior que totalPages
  const current = Math.min(page, totalPages);

  //maior número entre 1 e totalPages, garante que n é menor que 1
  const total = Math.max(1, totalPages);

  const R = "...";

  const showPages = 6;

  if (total <= showPages) {
    //retorna um array com total elementos, cada elemento é o índice + 1, pois o índice começa em 0
    return Array.from({ length: total }).map((_, i) => i + 1);
  }

  if (current < 3) {
    return [1, 2, 3, R, total - 1, total];
  }

  if (current === 3) {
    return [1, 2, 3, 4, R, total - 1, total];
  }

  if (current > total - 2) {
    return [1, 2, R, total - 2, total - 1, total];
  }

  if (current === total - 2) {
    return [1, 2, R, total -3, total - 2, total - 1, total]; 
  }

  return [1, R, current - 1, current, current + 1, R, total - 1, total];
};

export const usePagination = ({ current, limit, total }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const pages = generatePages(current, totalPages);
  const isCurrentPage = (n: number) => current === n;

  return {
    isCurrentPage,
    pages,
  };
};
