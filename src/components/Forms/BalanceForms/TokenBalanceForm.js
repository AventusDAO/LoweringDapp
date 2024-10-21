import React, { useContext, useState } from 'react'
import { queryBalanceContext, stateContext } from '../../../Contexts/Context'
import { ercTokenBalanceHandler } from '../../../utils/avnUtils/queryBalance'

export default function TokenBalanceForm() {
  const [token, setToken] = useState('')
  const { substrateUser, api, _hasPayer, set_HasPayer, PRIMARY_TOKEN_ADDRESS } =
    useContext(stateContext)
  const method = 'getTokenBalance'
  const { ercQueryLoading, setErcQueryLoading } =
    useContext(queryBalanceContext)

  return (
    <div
      id='bal-token-tab-pane'
      role='tabpanel'
      aria-labelledby='ERC20-tab'
      tabIndex='0'
    >
      <hr />
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            setErcQueryLoading(true)
            ercTokenBalanceHandler({
              tokenType: 'TOKEN',
              substrateUser,
              PRIMARY_TOKEN_ADDRESS,
              isMain: false,
              _hasPayer,
              api,
              set_HasPayer,
              method,
              tokenAddress: token
            })
            setErcQueryLoading(false)
          } catch (err) {
            console.log(err)
          }
        }}
      >
        <div className='text-start'>
          <h3 className='text-start' style={{ fontWeight: '700' }}>
            Balance
          </h3>
          <span className={`popText`} style={{ fontWeight: '700' }}>
            Token
          </span>
        </div>
        <div className='input-group mb-3'>
          <span
            className='input-group-text'
            style={{ maxWidth: '100px' }}
            id='Token'
          >
            Token
          </span>
          <input
            type='text'
            style={{
              backgroundColor: 'white',
              color: 'black',
              weight: 'bold'
            }}
            className='form-control'
            aria-label='Token'
            aria-describedby='Token'
            size='83'
            id='tokenAddress'
            maxLength='42'
            minLength='42'
            min={0}
            required
            pattern='0x[0-9a-fA-F]{40}'
            placeholder='Contract address (eg: 0x46a1a476d02f4a79b7a38fa0863a954ae252251d)'
            onChange={e => setToken(e.target.value)}
            value={token}
          />
        </div>

        <div className='text-start'>
          <button
            type='submit'
            className={`btn submit-button `}
            disabled={ercQueryLoading}
            style={{ fontWeight: 'bold' }}
          >
            Check
          </button>
          <div style={{ fontSize: '13px' }}>
            <br />
            Note: Your wallet may prompt you once to sign and approve the query
            operation required to query your balance.
          </div>
        </div>
      </form>
    </div>
  )
}
