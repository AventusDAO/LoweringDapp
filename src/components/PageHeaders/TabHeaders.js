import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { stateContext } from '../../Contexts/Context'

export const TabHeaders = () => {
  const navigate = useNavigate()
  const { SHOW_BALANCE_PAGE } = useContext(stateContext)

  const pageLinks = [
    { 'Step-1': '/' },
    { 'Step-2': '/claim' },
    { Balance: '/balance' }
  ]
  if (!SHOW_BALANCE_PAGE) pageLinks.pop()

  return (
    <nav className={`navbar rectangle`}>
      <div className='container-fluid align-self-center justify-center'>
        <ul
          className='nav nav-tabs align-self-center mx-auto mobile-bigButton'
          style={{ textAlign: 'center' }}
          id='myTab'
          role='tablist'
        >
          {pageLinks.map((value, index) => (
            <li
              key={index}
              className='nav-item align-self-center justify-center'
              style={{ display: 'inline-block' }}
              role='presentation'
            >
              <button
                className={`nav-link btn tabHeaderButtons active                                                    `}
                id={`${value.key}-tab`}
                type='button'
                onClick={() => {
                  navigate(Object.values(value).toString())
                }}
              >
                {Object.keys(value)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
