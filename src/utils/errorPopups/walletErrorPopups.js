import swal from 'sweetalert2'
import { capitaliseFirstLetter } from '../randomFunctions'

const BUTTON_COLOR = window?.appConfig?.BUTTON_COLOR

export function substrateNotDetected(name) {
  let url
  if (name === 'talisman') {
    url =
      'https://docs.talisman.xyz/talisman/navigating-the-paraverse/account-management/download-the-extension'
  } else if (name === 'subwallet-js') {
    url = 'https://subwallet.app/download.html'
  } else {
    url = 'https://polkadot.js.org/extension/'
  }
  swal.fire({
    title: `${capitaliseFirstLetter(name)} extension not detected!`,
    text: 'To interact with this DApp you must first download and install the extension in your browser',
    allowOutsideClick: false,
    showCloseButton: true,
    confirmButtonColor: '#ffffff',
    confirmButtonText: name
      ? `<a href=${url} target="_blank">Download ${name}</a>`
      : '',
    icon: 'error',
    footer: `<p class="text-center">If the wallet is installed, confirm this dapp is approved to access the wallet from within Manage Website Access in the extension.`
  })
}

export function substrateConnectFailure() {
  swal.fire({
    title: 'Substrate wallet not connected!',
    allowOutsideClick: false,
    icon: 'error',
    confirmButtonText: 'Close',
    confirmButtonColor: BUTTON_COLOR
  })
}

export function metamaskMissingErrorHandler() {
  return swal.fire({
    title: 'Metamask not detected!',
    text: 'Please ensure you have the latest version of Metamask installed',
    confirmButtonColor: '#ffffff',
    confirmButtonText: `<a href="https://metamask.io/download/" target="_blank">Download Metamask</a>`,
    allowOutsideClick: false,
    icon: 'error',
    showCloseButton: true
  })
}

export function metamaskConnectionErrorHandler(val) {
  swal.fire({
    title: 'Metamask not connected!',
    html: `Please connect to Metamask on the <a href="/claim">Claim Token</a> page and try again`,
    allowOutsideClick: false,
    icon: 'error',
    confirmButtonColor: BUTTON_COLOR,
    confirmButtonText: 'Close',
    footer: val ? `<p class="text-center"> ${val}</p>` : ''
  })
}

export function signingErrorHandler(err, more) {
  return swal.fire({
    title: 'Signing Failure',
    text: err.toString(),
    allowOutsideClick: false,
    icon: 'error',
    confirmButtonColor: BUTTON_COLOR,
    confirmButtonText: 'Okay',
    footer: more ? `<p class="text-center">${more}</p>` : ''
  })
}

export function invalidSubstrateSignature() {
  return swal.fire({
    title: 'Invalid Signature',
    text: 'The signature could not be generated. Please retry.',
    allowOutsideClick: false,
    icon: 'error',
    confirmButtonColor: BUTTON_COLOR,
    confirmButtonText: 'Okay'
  })
}

export function networkErrorHandler(err) {
  return swal.fire({
    title: 'Unsupported EVM Network',
    text: err,
    allowOutsideClick: false,
    icon: 'error',
    confirmButtonText: 'Okay',
    confirmButtonColor: BUTTON_COLOR
  })
}
