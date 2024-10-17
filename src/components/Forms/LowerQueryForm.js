import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stateContext } from '../../Contexts/Context'
import { validateInput } from '../../utils/ethereumUtils/claimValidation'

/*
Form to take in the user's search item. The search item could be: sender address, sender public key, recipient eth address.
Currentlh includes some dummy code until the backend is set up
*/

export default function LowerQueryForm() {
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [userLowerId, setUserLowerId] = useState('')
  const { COMPANY_NAME, EVM_NETWORK_NAME } = useContext(stateContext)

  async function submit({ account, userLowerId }) {
    const result = await validateInput({ account, userLowerId })
    if (result) {
      try {
        navigate(`/lowers/${result}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div
      className='container form-container'
      style={{
        marginBottom: '20%',
        minHeight: '100%',
        color: 'black'
      }}
    >
      <div
        className='row mx-auto align-self-center text-center tab-content justify-center'
        id='myTabContent'
      >
        <div
          className='tab-pane py-3 fade show active custom-lower-tab-width'
          id='search-tab-pane'
          role='tabpanel'
          aria-labelledby='search-tab'
          tabIndex='0'
        >
          Search using any of these: The Lower ID of the scheduled lower, the
          sender's address or recipient's address.
          <br />
          <br />
          <form
            onSubmit={event => {
              event.preventDefault()
              submit({ account, userLowerId })
              // submit({ account, userLowerId });
            }}
          >
            <li className='col d-flex'>
              <div className='input-group mb-3  text-center'>
                <span
                  className='input-group-text'
                  style={{ minWidth: '100px' }}
                  id='basic-addon1'
                >
                  Account
                </span>
                <input
                  size='83'
                  type='text'
                  pattern='0x[0-9a-fA-F]{64}|[0-9a-zA-Z]{48,64}|0x[0-9a-fA-F]{40}'
                  maxLength={66}
                  className='form-control'
                  placeholder={`${COMPANY_NAME} Sender Address OR ${EVM_NETWORK_NAME} Recipient Address`}
                  value={account}
                  onChange={e => setAccount(e.target.value)}
                  id='account'
                />
              </div>
            </li>
            <li className='d-flex col'>
              <div className='input-group mb-3'>
                <span
                  className='input-group-text'
                  style={{ minWidth: '100px' }}
                  id='basic-addon1'
                >
                  Lower ID
                </span>
                <input
                  size='83'
                  type='number'
                  min={0}
                  className='form-control'
                  placeholder={`Lower ID`}
                  value={userLowerId}
                  onChange={e => setUserLowerId(e.target.value)}
                  id='userLowerId'
                />
              </div>
            </li>
            <button
              type='submit'
              className={`btn submit-button mobile-bigButton`}
              style={{ fontWeight: 'bold' }}
            >
              Search Lowers
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
