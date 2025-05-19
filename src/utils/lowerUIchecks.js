import swal from 'sweetalert2'
import {
  substrateConnectFailure,
  metamaskConnectionErrorHandler
} from './errorPopups/walletErrorPopups'
import { genericErrorHandlerTemplate } from './errorPopups/genericErrorPopups'
import { amountChecker } from './ethereumUtils/decimalHandler'

// for erc20 and 777 tokens
export async function ercConfirmLowerDetails({
  substrateUserAddress,
  ethereumAccount,
  tokenType,
  tokenAddress,
  amount,
  t1Recipient,
  NETWORK_ID,
  metamaskNetworkId,
  isERC20,
  isERC777,
  EVM_NETWORK_NAME
}) {
  if (substrateUserAddress) {
    if (!ethereumAccount) {
      metamaskConnectionErrorHandler(
        'Metamask is required to confirm the token details'
      )
    } else {
      const isCorrectEthereumNetwork = metamaskNetworkId === NETWORK_ID
      if (!isCorrectEthereumNetwork) {
        genericErrorHandlerTemplate(
          'Switch EVM Network',
          `Please ensure your EVM wallet network is set to ${EVM_NETWORK_NAME}.`,
          "Metamask is required to confirm the token contract's details."
        )
      } else {
        const _amount = await amountChecker({
          amount,
          tokenAddress,
          isERC20,
          isERC777
        })
        if (_amount) {
          const ETHERSCAN_TOKEN_LINK = window?.appConfig?.ETHERSCAN_TOKEN_LINK

          const { isConfirmed: userChoice } = await swal.fire({
            title: 'Confirm details',
            html: `<small>Lower ${amount} <a href=${ETHERSCAN_TOKEN_LINK}${tokenAddress} target="_blank"> ${tokenType} </a> to ${t1Recipient} ?</small>`,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            allowOutsideClick: false,
            denyButtonText: 'No',
            confirmButtonColor: 'green',
            footer: `<strong>full decimal value</strong>:&nbsp${_amount}`
          })
          return { userChoice, _amount }
        } else {
          if (isERC20) {
            genericErrorHandlerTemplate(
              'Cannot Find Token Contract',
              `Please confirm this token exists on ${EVM_NETWORK_NAME}.`,
              `Only ${EVM_NETWORK_NAME} contracts are supported.`
            )
          } else {
            genericErrorHandlerTemplate(
              'Is not ERC777',
              `Please confirm that this token's contract exists on ${EVM_NETWORK_NAME} and is ERC777 standard.`,
              `Only ${EVM_NETWORK_NAME} contracts are supported.`
            )
          }
        }
      }
    }
  } else {
    substrateConnectFailure()
  }
}

export async function userSignatureConfirmation() {
  const { isConfirmed: result } = await swal.fire({
    title: 'Signature Required',
    text: 'Sign to validate your account',
    allowOutsideClick: false,
    showDenyButton: true,
    confirmButtonText: 'Sign',
    denyButtonText: "Don't Sign",
    confirmButtonColor: 'green',
    footer: 'This operation is free'
  })
  return result ? result : ''
}

// for the main token and eth tokens
export async function confirmLowerDetails({
  substrateUserAddress,
  tokenType,
  tokenAddress,
  amount,
  t1Recipient
}) {
  if (substrateUserAddress) {
    // First check if the recipient address is valid
    if (!(await isValidRecipientAddress(t1Recipient))) {
      return { userChoice: false }
    }

    const _amount = await amountChecker({
      amount,
      tokenAddress,
      isERC20: tokenAddress !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      isERC777: false
    })
    const ETHERSCAN_TOKEN_LINK = window?.appConfig?.ETHERSCAN_TOKEN_LINK

    let tokenLink = `<a href=${ETHERSCAN_TOKEN_LINK}${tokenAddress} target="_blank"> ${tokenType} </a>`
    tokenLink =
      tokenAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
        ? tokenType
        : tokenLink

    const { isConfirmed: userChoice } = await swal.fire({
      title: 'Confirm details',
      html: `<small>Lower ${amount} ${tokenLink} to ${t1Recipient} ?</small>`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      denyButtonText: 'No',
      confirmButtonColor: 'green',
      footer: `<strong>full decimal value</strong>:&nbsp${_amount}`
    })
    return { userChoice, _amount }
  } else {
    substrateConnectFailure()
  }
}

async function isValidRecipientAddress(recipientAddress) {
  const supportedTokens = window?.appConfig?.SUPPORTED_TOKENS
  const additionalInvalidRecipients =
    window?.appConfig?.INVALID_RECIPIENT_ADDRESSES || []

  // Join the known tokens and invalid recipients
  const invalidRecipients = Object.values(supportedTokens)
    .map(token => token.address)
    .concat(additionalInvalidRecipients)

  // Check if address is in the known addresses. Make sure to check the address in lowercase
  const isInvalidRecipient = invalidRecipients.some(
    invalidRecipient =>
      invalidRecipient.toLowerCase() === recipientAddress.toLowerCase()
  )

  if (isInvalidRecipient) {
    const { isConfirmed: userChoice } = await swal.fire({
      title: 'Invalid recipient address',
      html: `<div style="text-align: left;"><small>The recipient address you are lowering to is not valid because it looks like this is not a user account.
      <br /><br />Please make sure you have access to the private keys of this address. If you lower to the wrong address, <strong>you may lose all your funds</strong>I.
      <br /><br />Are you sure you want to continue lowering?</small></div>
      <style>
      .swal2-icon.swal2-warning {
        width: 4em !important;
        height: 4em !important;
      }
      </style>`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, I understand the risks',
      allowOutsideClick: false,
      denyButtonText: 'No, cancel lower',
      confirmButtonColor: 'red',
      denyButtonColor: 'green',
      icon: 'warning',
      footer: `<strong>Invalid recipient detected</strong>&nbsp`
    })
    return userChoice
  }

  return true
}
