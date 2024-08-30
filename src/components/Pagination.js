export const Pagination = ({ totalTabs, tabsPerPage, paginate }) => {
  const lastPage = Math.ceil(totalTabs / tabsPerPage)
  const pageNumbers = []
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i)
  }
  return (
    <nav aria-label='Page navigation'>
      {pageNumbers.length > 1 && (
        <ul className='pagination flex-wrap'>
          <li className='page-item'>
            <a
              onClick={() => paginate(1)}
              className='page-link'
              href='#1'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
            </a>
          </li>

          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a
                onClick={() => paginate(number)}
                className='page-link'
                href={`#${number}`}
              >
                {number}
              </a>
            </li>
          ))}
          <li className='page-item'>
            <a
              onClick={() => paginate(lastPage)}
              className='page-link'
              href={`#${lastPage}`}
              aria-label='Next'
            >
              <span aria-hidden='true'>&raquo;</span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
