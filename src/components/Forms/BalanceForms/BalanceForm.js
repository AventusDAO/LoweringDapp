import React, { useState } from 'react'
import PolkadotPageHeader from '../../PageHeaders/PolkadotPageHeader'
import { balanceButtonContext } from '../../../Contexts/Context'
import BalanceButtons from './BalanceButtons'

/* Configures what's shown on the balance page of the dapp
    Has three buttons, with a toggle state to determine if a form linked to the second button is shown.
*/
function BalanceForm() {
  const [isShown, setIsShown] = useState(false)

  let title = 'Balance'
  let description = 'View your Network balances'
  const isValidPage = true

  return (
    <>
      {/* Inserts the Polkadot header to the page with the relevant title and description for this page */}
      <PolkadotPageHeader
        title={title}
        description={description}
        isValidPage={isValidPage}
      />
      <div
        className='container-fluid mt-4'
        style={{ marginBottom: '20%', color: 'black' }}
      >
        <div className='row'>
          <main role='main' className='text-center'>
            <div className='content mr-auto ml-auto'>
              <div
                className='container form-container'
                style={{ minHeight: '100%' }}
              >
                <div
                  className='row mx-auto align-self-center text-center tab-content justify-center'
                  id='myTabContent'
                >
                  <balanceButtonContext.Provider
                    value={{
                      isShown,
                      setIsShown
                    }}
                  >
                    <BalanceButtons />
                  </balanceButtonContext.Provider>

                  {isShown ? (
                    ''
                  ) : (
                    <div style={{ fontSize: '13px' }}>
                      <br />
                      Note: Your wallet may prompt to approve the balance query
                      operation
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default BalanceForm
