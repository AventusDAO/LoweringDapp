import React, { useContext } from 'react'
import { formContext, stateContext } from '../../Contexts/Context'

const FormNav = ({ tokenTabs }) => {
  const { setTokenAddress, setAmount, setT1Recipient } = useContext(formContext)
  const { COMPANY_NAME_WITH_UNDERSCORE } = useContext(stateContext)

  function clearValues() {
    setTokenAddress('')
    setAmount('')
    setT1Recipient('')
  }
  const neededButtons = tokenTabs.length > 1 ? true : false

  return (
    <>
      {neededButtons && (
        <ul
          className='nav nav-tabs justify-content-center form-headers'
          id='myTab'
          role='tablist'
        >
          {tokenTabs.map((value, index) => (
            <li key={index} className='nav-item' role='presentation'>
              <button
                className={`btn formNav-button
								                    ${index === 0 ? 'active' : ''}
								                `}
                id={`${value}-tab`}
                data-bs-toggle='tab'
                data-bs-target={`#${value}-tab-pane`}
                type='button'
                role='tab'
                aria-controls={`${value}-tab-pane`}
                aria-selected='false'
                onFocus={() => clearValues()}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default FormNav
