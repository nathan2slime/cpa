import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '../ui/pagination'

interface PaginationComponentProps {
  totalPages: number
  setPage?: Dispatch<SetStateAction<number>>
}

export const PaginationComponent = ({ totalPages, setPage }: PaginationComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const setParams = (page: number): void => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    window.history.pushState(null, '', `?${params.toString()}`)
    setCurrentPage(page)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setParams(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setParams(currentPage + 1)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page') || 1)
    setCurrentPage(page)
    setPage && setPage(page)
  }, [window.location.search])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={currentPage <= 1} onClick={handlePrevious} variant={'ghost'}>
            Anterior
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink className="cursor-pointer" isActive={pageNumber === currentPage} onClick={() => setParams(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button disabled={currentPage >= totalPages} onClick={handleNext} variant={'ghost'}>
            Próximo
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
