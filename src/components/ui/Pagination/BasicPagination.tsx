import Pagination from 'react-js-pagination'
import '@/style/pagination.css'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'

interface Props {
  activePage: number
  itemsPerPage: number
  pageCount?: number
  totalItemsCount: number
  onPageChange: (pageNumber: number) => void
}

const BasicPagination = ({ activePage, itemsPerPage, totalItemsCount, onPageChange }: Props) => {
  return (
    <div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={onPageChange}
        itemClass="page-item"
        linkClass="page-link"
        nextPageText={<ChevronRightIcon className="h-4 w-4" />}
        prevPageText={<ChevronRightIcon className="h-4 w-4 rotate-180" />}
        hideFirstLastPages={true}
      />
    </div>
  )
}

export default BasicPagination
