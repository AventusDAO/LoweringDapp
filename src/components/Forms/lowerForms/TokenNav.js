import React, { useContext } from 'react'
import { formContext, stateContext } from '../../../Contexts/Context'

export default function TokenNav() {
  const { setTokenAddress, selectedToken, setSelectedToken, setCustomToken } =
    useContext(formContext)

  const { BUTTON_COLOR, TEXT_COLOR } = useContext(stateContext)
  const SUPPORTED_TOKENS = window?.appConfig?.SUPPORTED_TOKENS

  return (
    <div className='text-start'>
      <div className='dropdown'>
        <button
          className={`btn badge dropdown-toggle`}
          type='button'
          style={{
            borderRadius: '3px',
            border: 'solid',
            "background-color": BUTTON_COLOR,
            "border-color": BUTTON_COLOR,
            color: TEXT_COLOR,
          }}
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {selectedToken !== '' ? selectedToken : 'Select Token'}
        </button>
        <ul className='dropdown-menu nav-tokens' id='tokenList'>
          {Object.values(SUPPORTED_TOKENS).map(token => (
            <li key={token.name} className='nav-item'>
              <button
                className={'dropdown-item'}
                style={{
                  "background-color": BUTTON_COLOR,
                  color: TEXT_COLOR,
                }}
                id={`${token.name}-tab`}
                type='button'
                onClick={() => {
                  setCustomToken(false)
                  setSelectedToken(token.name)
                  setTokenAddress(token.address)
                }}
              >
                {token.name}
              </button>
            </li>
          ))}
          <hr style={{ margin: 0 }} />
          <li className='nav-item' role='presentation'>
            <button
              className={'dropdown-item'}
              style={{
                color: TEXT_COLOR,
                "background-color": BUTTON_COLOR,
              }}
              id={`custom-token`}
              onClick={() => {
                setCustomToken(true)
                setTokenAddress('')
                setSelectedToken('Custom Token')
              }}
            >
              Custom Token
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
