// import company_logo from "../../assets/img/company_logo.svg";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { stateContext } from '../../Contexts/Context'
import CompanyLogo from '../Extras/CompanyLogo'

export function HeaderNav() {
  const { COMPANY_SUPPORT_URL, COMPANY_NAME_WITH_UNDERSCORE } =
    useContext(stateContext)

  return (
    <>
      <nav className='navbar'>
        <div className='container-fluid'>
          <CompanyLogo />
          <button
            className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-navbar-toggler`}
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
      </nav>
      <div className='collapse' id='navbarToggleExternalContent'>
        <div className='p-4 text-end'>
          <ul className='navbar-nav mr-auto justify-content-between w-100'>
            <li className='nav-item'>
              <Link
                className='nav-link text-dark text-decoration-none'
                to='/FAQ'
              >
                FAQ
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-dark text-decoration-none' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link text-decoration-none text-white'
                href={COMPANY_SUPPORT_URL}
                target='_blank'
                rel='noreferrer'
              >
                <span
                  className={`${COMPANY_NAME_WITH_UNDERSCORE}-contact-us-button`}
                  style={{
                    padding: '10px',
                    borderRadius: '5px'
                  }}
                >
                  Contact
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
