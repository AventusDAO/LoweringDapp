import React, { useContext } from 'react'
import { stateContext } from '../Contexts/Context'
import { Link } from 'react-router-dom'

function Footer() {
  const { COMPANY_NAME } = useContext(stateContext)
  return (
    <div className='footer'>
      <div className='text-center'>
        <strong>
          <Link
            style={{
              color: 'White',
              textDecoration: 'none'
            }}
            to='/FAQ'
          >
            Frequently Asked Questions
          </Link>
        </strong>
      </div>
      <div
        className='text-center font-weight-bold  my-2'
        style={{ backgroundColor: 'white', color: '#1D2733' }}
      >
        &copy; {COMPANY_NAME} {new Date().getFullYear()}. Powered by Aventus
        Network.
      </div>
    </div>
  )
}

export default Footer
