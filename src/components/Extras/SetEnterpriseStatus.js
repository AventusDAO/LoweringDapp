import React, { useContext } from 'react'
import { stateContext } from '../../Contexts/Context'
import { gotAnEnterpriseAccount } from '../../utils/someUIpopups'

export default function SetEnterpriseStatus() {
  const { set_HasPayer, _hasPayer, SUPPORTS_ENTERPRISE_USERS } =
    useContext(stateContext)
  return (
    <>
      {SUPPORTS_ENTERPRISE_USERS && (
        <div>
          <div className='text-start'>
            <button
              className={`btn set-enterprise-token-button ${
                _hasPayer ? 'disabled' : ''
              }`}
              onClick={async () => {
                const result = await gotAnEnterpriseAccount()
                if (result) {
                  set_HasPayer(result)
                }
              }}
            >
              {_hasPayer ? 'Refresh to Reset' : 'Set Enterprise Status'}
            </button>
            <br />
          </div>
        </div>
      )}
    </>
  )
}
