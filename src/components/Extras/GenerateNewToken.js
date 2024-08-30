import React, { useContext } from 'react'
import { stateContext } from '../../Contexts/Context'
import { regenerateGatewayToken } from '../../utils/someUIpopups'

export default function GenerateNewToken() {
  const { setRegenerateToken, COMPANY_NAME_WITH_UNDERSCORE } =
    useContext(stateContext)
  return (
    <>
      <div className='text-end'>
        <button
          className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-generate-new-token-button`}
          onClick={async () => {
            const isTrue = await regenerateGatewayToken()
            setRegenerateToken(isTrue)
          }}
        >
          Generate New Token
        </button>
        <br />
      </div>
    </>
  )
}
