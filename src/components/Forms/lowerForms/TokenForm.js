import React, { useContext } from 'react'
import { formContext, stateContext } from '../../../Contexts/Context'
import { lowerSubmitHandler } from '../../../utils/avnUtils/lowerSubmitHandler'
import { confirmLowerDetails } from '../../../utils/lowerUIchecks'
import { Spinner } from '../../Extras/Tools'
import TokenNav from './TokenNav'

export default function TokenForm() {
  const {
    amount,
    setAmount,
    t1Recipient,
    setT1Recipient,
    lowerLoading,
    setLowerLoading,
    customToken,
    selectedToken,
    tokenAddress,
    setTokenAddress
  } = useContext(formContext)

  const {
    substrateUser,
    _hasPayer,
    api,
    set_HasPayer,
    AVN_RELAYER,
    EXPLORER_TX_URL,
    ARCHIVE_EXPLORER_URL,
    EVM_NETWORK_NAME,
    PM_Token
  } = useContext(stateContext)

  return (
    <div
      className={'tab-pane py-3 fade show active'}
      id={'lift-form-tab-pane'}
      role='tabpanel'
      aria-labelledby={'lower-form-tab'}
    >
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            setLowerLoading(true)
            const result = await confirmLowerDetails({
              substrateUserAddress: substrateUser.address,
              tokenType: selectedToken,
              tokenAddress,
              amount,
              t1Recipient
            })

            if (result?.userChoice) {
              await lowerSubmitHandler({
                substrateUser,
                api,
                _hasPayer,
                set_HasPayer,
                tokenAddress,
                amount: result._amount,
                t1Recipient,
                tokenType: selectedToken,
                AVN_RELAYER,
                EXPLORER_TX_URL,
                ARCHIVE_EXPLORER_URL,
                method:
                  selectedToken === PM_Token
                    ? 'lowerFromPredictionMarket'
                    : 'lowerToken'
              })
              setLowerLoading(false)
            } else {
              setLowerLoading(false)
            }
          } catch (err) {
            return err
          }
        }}
      >
        <TokenNav />
        <br />
        {customToken && (
          <div className='input-group mb-3'>
            <span
              className='input-group-text'
              style={{ maxWidth: '100px' }}
              htmlFor='tokenAddress'
              id='tokenAddress'
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
              aria-label='token'
              aria-describedby='token'
              size='83'
              maxLength='42'
              minLength='42'
              pattern='0x[0-9a-fA-F]{40}'
              required
              placeholder='Contract Address (eg: 0xA899f9a78f222fF8ED36DBBDb72A62Dd92EF025A)'
              value={tokenAddress}
              onChange={e => setTokenAddress(e.target.value)}
              id='tokenAddress'
            />
          </div>
        )}
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
            disabled={selectedToken === ''}
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
            disabled={selectedToken === ''}
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
            className={`btn mobile-bigButton submit-button `}
            disabled={lowerLoading || selectedToken === ''}
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
