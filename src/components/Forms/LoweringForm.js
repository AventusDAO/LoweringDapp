import React, { useState, useContext } from 'react'
import { formContext, stateContext } from '../../Contexts/Context'
import PolkadotPageHeader from '../PageHeaders/PolkadotPageHeader'
import TokenForm from './lowerForms/TokenForm'

export default function LoweringForm() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [t1Recipient, setT1Recipient] = useState('')
  const [lowerLoading, setLowerLoading] = useState('')
  const [customToken, setCustomToken] = useState(false)
  const [selectedToken, setSelectedToken] = useState('')

  const { ENVIRONMENT_NAME, EVM_NETWORK_NAME } = useContext(stateContext)

  const title = 'Lower'
  const description = `Move funds from ${ENVIRONMENT_NAME} to ${EVM_NETWORK_NAME}`
  const isValidPage = true

  return (
    <>
      <PolkadotPageHeader
        title={title}
        description={description}
        isValidPage={isValidPage}
      />
      <div className='container-fluid mt-4' style={{ marginBottom: '20%' }}>
        <div className='row'>
          <main role='main' className='text-center'>
            <div className='content mr-auto ml-auto'>
              <div
                className='container form-container'
                style={{ minHeight: '100%' }}
              >
                <formContext.Provider
                  value={{
                    t1Recipient,
                    setT1Recipient,
                    amount,
                    setAmount,
                    tokenAddress,
                    setTokenAddress,
                    lowerLoading,
                    setLowerLoading,
                    selectedToken,
                    setSelectedToken,
                    customToken,
                    setCustomToken
                  }}
                >
                  <div className='row'>
                    <div className='col'>
                      <div
                        className='row text-center tab-content justify-center'
                        style={{
                          color: 'black'
                        }}
                        id='myTabContent'
                      >
                        <TokenForm />
                      </div>
                    </div>
                  </div>
                </formContext.Provider>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
