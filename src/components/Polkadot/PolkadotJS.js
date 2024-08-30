import React, { useContext } from 'react'
import { stateContext } from '../../Contexts/Context'
import { DesktopPolkadotExtensions } from './DesktopPolkadotExtensions'
import { MobilePolkadotExtensions } from './MobilePolkadotExtensions'
import greenIcon from '../../assets/img/green-icon.png'
import wallet from '../../assets/img/wallet.svg'
import { addressSlicer } from '../../utils/randomFunctions'

export function PolkadotJS() {
  return (
    <div className='placement-position'>
      <div className='mobile-ext'>
        <MobileHeaderButtons />
      </div>
      <div className='desktop-ext'>
        <DesktopHeaderButtons />
      </div>
    </div>
  )
}

function MobileHeaderButtons() {
  const {
    ALTERNATE_NETWORK_URL,
    ALTERNATE_NETWORK_NAME,
    COMPANY_NAME,
    substrateUser,
    COMPANY_NAME_WITH_UNDERSCORE
  } = useContext(stateContext)

  return (
    <div className='mobile-ext'>
      {substrateUser ? (
        <>
          <img src={greenIcon} width={20} height={20} alt='logo' />
          <span
            className='fw-bold small-line account-info'
            style={{ fontSize: '11px' }}
          >
            Connected {COMPANY_NAME} account:
          </span>
          <span
            className='mobile-ext'
            id='account'
            style={{ fontSize: '11px' }}
          >
            {addressSlicer(substrateUser.address, 15, 40)}
          </span>
          <button
            type='button'
            className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn mobile-bigButton`}
            data-bs-toggle='modal'
            data-bs-target='#extensionsMobileModal'
          >
            <img src={wallet} alt='logo' />
          </button>
          <MobilePolkadotExtensions />
          &nbsp;
        </>
      ) : (
        <MobileNoAccount />
      )}
      {ALTERNATE_NETWORK_NAME && (
        <a
          href={ALTERNATE_NETWORK_URL}
          style={{ textDecoration: 'none' }}
          rel='noopener noreferrer'
        >
          <button
            className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn mobile-bigButton`}
          >
            Switch To {ALTERNATE_NETWORK_NAME}
          </button>
        </a>
      )}
    </div>
  )
}

function DesktopHeaderButtons() {
  const {
    ALTERNATE_NETWORK_URL,
    ALTERNATE_NETWORK_NAME,
    COMPANY_NAME,
    substrateUser,
    COMPANY_NAME_WITH_UNDERSCORE
  } = useContext(stateContext)

  return (
    <div className='desktop-ext row'>
      {substrateUser ? (
        <div className='col-sm text-start'>
          <img src={greenIcon} width={20} height={20} alt='logo' />
          <span className='fw-bold' style={{ fontSize: '11px' }}>
            Connected {COMPANY_NAME} account:
          </span>
          <br />
          <span
            className='desktop-ext'
            id='account'
            style={{ fontSize: '11px' }}
          >
            {substrateUser.address}
          </span>
          <br />

          <button
            type='button'
            className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn`}
            data-bs-toggle='modal'
            data-bs-target='#extensionsModal'
          >
            <img src={wallet} alt='logo' /> Wallet
          </button>
          <DesktopPolkadotExtensions />
        </div>
      ) : (
        <span className='col-sm text-start'>
          <br />
          <DesktopNoAccount />
        </span>
      )}
      &nbsp;
      <span className='col-sm text-end bottom'>
        <br />
        <br />
        {ALTERNATE_NETWORK_NAME && (
          <a
            href={ALTERNATE_NETWORK_URL}
            style={{ textDecoration: 'none' }}
            rel='noopener noreferrer'
          >
            <button
              className={`btn text-end ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn mobile-bigButton`}
            >
              Switch To {ALTERNATE_NETWORK_NAME}
            </button>
          </a>
        )}
      </span>
    </div>
  )
}

function DesktopNoAccount() {
  const { COMPANY_NAME_WITH_UNDERSCORE } = useContext(stateContext)
  return (
    <>
      <div style={{ fontSize: '11px' }}>
        <span className='text-muted'>Not connected</span>
      </div>
      <button
        type='button'
        className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn`}
        data-bs-toggle='modal'
        data-bs-target='#extensionsModal'
      >
        + Connect Account
      </button>
      <DesktopPolkadotExtensions />
    </>
  )
}

function MobileNoAccount() {
  const { COMPANY_NAME_WITH_UNDERSCORE } = useContext(stateContext)
  return (
    <>
      <div style={{ fontSize: '11px' }}>
        <span className='text-muted'>Not connected</span>
      </div>
      <button
        type='button'
        className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn mobile-bigButton`}
        data-bs-toggle='modal'
        data-bs-target='#extensionsMobileModal'
      >
        <img src={wallet} alt='logo' />
      </button>
      <MobilePolkadotExtensions />
      &nbsp;
    </>
  )
}
