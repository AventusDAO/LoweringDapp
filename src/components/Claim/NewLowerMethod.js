import React, { useContext } from 'react'
import { claimNow } from '../../utils/ethereumUtils/claimNow'
import { stateContext } from '../../Contexts/Context'

export function NewLowerMethod({ claimData }) {
  const {
    ethereumAccount,
    metamaskNetworkId,
    bridgeContract,
    COMPANY_NAME_WITH_UNDERSCORE
  } = useContext(stateContext)

  return (
    <>
      {Object.keys(claimData).length !== 0 ? (
        <div
          style={{
            justifyContent: 'space-between'
          }}
        >
          <button
            className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-submit-button mobile-bigButton ${COMPANY_NAME_WITH_UNDERSCORE}-btn justify-content-center items-align-center`}
            onClick={() => {
              claimNow({
                claimData,
                ethereumAccount,
                bridgeContract,
                metamaskNetworkId,
                method: 'new'
              })
            }}
          >
            Claim
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
