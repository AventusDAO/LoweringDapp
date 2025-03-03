import swal from 'sweetalert2'

const BUTTON_COLOR = window?.appConfig?.BRAND_COLOR
const EVM_NETWORK_NAME = window?.appConfig?.EVM_NETWORK_NAME

export async function TxSubmitted(id) {
  await swal.fire({
    title: `Transaction Submitted`,
    text: 'Confirmation will follow shortly',
    allowOutsideClick: false,
    icon: 'success',
    showConfirmButton: true,
    confirmButtonText: 'Okay',
    confirmButtonColor: BUTTON_COLOR,
    showCloseButton: true
  })
  navigator.clipboard.writeText(id)
}

export async function showUserStakeTxStatus({ polledState, explorerTxUrl, explorerTxId}) {
  if (polledState.status === 'Processed') {
    await swal.fire({
      title: 'Lower Scheduled Successfully',
      showCloseButton: true,
      allowOutsideClick: false,
      text: `Your Lower ID is: ${polledState.eventArgs.lowerId}`,
      confirmButtonColor: '#DFF2FF',
      showConfirmButton: explorerTxId ? true : false,
      confirmButtonText: `<a href="${explorerTxUrl}${explorerTxId}" target="_blank">View transaction on Explorer</a>`,
      icon: 'success',
      footer: `<span style="text-align: center"> You'll need to complete Step-2 once your lower is ready to be claimed on ${EVM_NETWORK_NAME}.</span>`
    })
    return 'complete'
  } else if (polledState.status === 'Rejected') {
    const lowerId = polledState.eventArgs.lowerId
      ? polledState.eventArgs.lowerId
      : ''
    await swal.fire({
      title: 'Lower failed',
      showCloseButton: true,
      text: `The transaction was rejected by the Chain, please check the details and retry. ${lowerId}`,
      confirmButtonColor: '#ffffff',
      showConfirmButton: false,
      footer: explorerTxId ? `<a href="${explorerTxUrl}${explorerTxId}" target="_blank">View transaction on Explorer</a>` : '',
      allowOutsideClick: false,
      icon: 'error'
    })
    return 'complete'
  } else if (polledState.status === 'Transaction not found') {
    await swal.fire({
      title: polledState.status,
      showCloseButton: true,
      text: 'Transaction not found. Please ensure you are querying the right network.',
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonColor: BUTTON_COLOR,
      confirmButtonText: 'Okay',
      icon: 'info'
    })
    return 'complete'
  }
}

export async function cannotConfirmTxStatus({ polledState, explorerTxUrl, explorerTxId }) {
  await swal.fire({
    title: `Unconfirmed Transaction Status`,
    text: `Please monitor your transaction using the transaction hash below: ${polledState.txHash}`,
    showCloseButton: true,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'success',
    footer: explorerTxId ? `<a href="${explorerTxUrl}${explorerTxId}" target="_blank">View transaction on the Explorer</a>` : ''
  })
  return 'complete'
}