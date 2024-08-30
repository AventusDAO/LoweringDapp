import React, { useContext } from 'react'
import { formContext, stateContext } from '../../../Contexts/Context'
import { lowerSubmitHandler } from '../../../utils/avnUtils/lowerSubmitHandler'
import { confirmLowerDetails } from '../../../utils/lowerUIchecks'
import { Spinner } from '../../Extras/Tools'

export default function MainTokenLoweringForm({ tokenType, position }) {
  const {
    amount,
    setAmount,
    t1Recipient,
    setT1Recipient,
    lowerLoading,
    setLowerLoading
  } = useContext(formContext)

  const {
    substrateUser,
    _hasPayer,
    api,
    set_HasPayer,
    AVN_RELAYER,
    EXPLORER_TX_URL,
    PRIMARY_TOKEN_ADDRESS,
    COMPANY_NAME_WITH_UNDERSCORE,
    EVM_NETWORK_NAME
  } = useContext(stateContext)

  return (
    <div
      className={`tab-pane py-3 fade ${position === '1' ? 'show active' : ''}`}
      id={`${tokenType}-tab-pane`}
      role='tabpanel'
      aria-labelledby={`${tokenType}-tab`}
      tabIndex='0'
    >
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            setLowerLoading(true)
            const result = await confirmLowerDetails({
              substrateUserAddress: substrateUser.address,
              tokenType,
              tokenAddress: PRIMARY_TOKEN_ADDRESS,
              amount,
              t1Recipient
            })

            if (result?.userChoice) {
              await lowerSubmitHandler({
                substrateUser,
                api,
                _hasPayer,
                set_HasPayer,
                tokenAddress: PRIMARY_TOKEN_ADDRESS,
                amount: result._amount,
                t1Recipient,
                tokenType,
                AVN_RELAYER,
                EXPLORER_TX_URL
              })
              setLowerLoading(false)
            } else {
              setLowerLoading(false)
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        <div className='text-start'>
          <h3 className='text-start' style={{ fontWeight: '700' }}>
            Lower Token
          </h3>
          <span
            className={`${COMPANY_NAME_WITH_UNDERSCORE}-popText`}
            style={{ fontWeight: '700' }}
          >
            {tokenType}
          </span>
        </div>
        <div className='input-group mb-3'>
          <span
            className='input-group-text'
            style={{ maxWidth: '100px' }}
            id='Amount'
          >
            Amount
          </span>
          <input
            type='text'
            style={{
              backgroundColor: 'white',
              color: 'black',
              weight: 'bold'
            }}
            className='form-control'
            aria-label='Amount'
            aria-describedby='Amount'
            size='83'
            min={0}
            required
            pattern='^[0-9]\d*(\.\d+)?$'
            placeholder='Whole or Fractional (eg: 10 or 1.053)'
            id='tokenAmount'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className='input-group mb-3'>
          <span
            className='input-group-text'
            style={{ maxWidth: '100px' }}
            id='Recipient'
          >
            Recipient
          </span>
          <input
            type='text'
            style={{
              backgroundColor: 'white',
              color: 'black',
              weight: 'bold'
            }}
            className='form-control'
            aria-label='Recipient'
            aria-describedby='Recipient'
            size='83'
            maxLength='42'
            minLength='42'
            required
            pattern='0x[0-9a-fA-F]{40}'
            placeholder={`${EVM_NETWORK_NAME} Address (eg: 0x405df1b38510c455ef81500a3dc7e9ae599e18f6)`}
            id='t1Recipient'
            value={t1Recipient}
            onChange={e => setT1Recipient(e.target.value)}
          />
        </div>
        <div className='text-start'>
          <button
            type='submit'
            className={`btn mobile-bigButton ${COMPANY_NAME_WITH_UNDERSCORE}-submit-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn`}
            disabled={lowerLoading}
            style={{ fontWeight: 'bold' }}
          >
            {lowerLoading ? <Spinner /> : 'Submit'}
          </button>
          <div style={{ fontSize: '13px' }}>
            <br />
            Note: Lowering requires multiple signatures, please follow all
            wallet prompts
          </div>
        </div>
      </form>
    </div>
  )
}
