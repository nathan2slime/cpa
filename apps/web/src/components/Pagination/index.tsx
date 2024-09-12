import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

export const Pagination = () => {
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious className={'cursor-pointer'} onClick={()=> page > 1 ? setParams( page -1 ) : null } />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={()=> setParams(Number(page) - 2)}>{Number(page) - 2}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={()=> setParams(Number(page) + 2)}>{Number(page) + 2}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext className={'cursor-pointer'} onClick={()=> Number(page) + 1 > Math.ceil(totalForms / 6) ? null : setParams(Number(page) + 1)} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}