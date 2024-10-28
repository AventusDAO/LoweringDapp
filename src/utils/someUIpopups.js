import swal from 'sweetalert2'
const PRIMARY_TOKEN = window?.appConfig?.PRIMARY_TOKEN
const BUTTON_COLOR = window?.appConfig?.BRAND_COLOR

export async function balanceAdjustedNotification(title, message, footer) {
  const { isConfirmed: result } = await swal.fire({
    title,
    text: message,
    showDenyButton: true,
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonText: 'Continue',
    denyButtonText: 'Cancel',
    confirmButtonColor: 'green',
    footer
  })
  return result
}

export async function userConfirmation() {
  const { isConfirmed: result } = await swal.fire({
    title: 'Signature Required',
    html: `This may prompt multiple sign operations but <b> you only pay once </b>`,
    showDenyButton: true,
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonText: 'Continue',
    denyButtonText: 'Cancel',
    confirmButtonColor: 'green'
  })
  return result
}

export const userBalance = async ({ tokenType, message, decAmount }) => {
  await swal.fire({
    title: `${tokenType} Balance`,
    text: decAmount,
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonColor: BUTTON_COLOR,
    confirmButtonText: 'Okay',
    footer: `<p class="text-center">${
      tokenType === PRIMARY_TOKEN
        ? `${message}`
        : tokenType === 'TOKEN'
        ? "Confirm the decimals for this token on the token's smart contract"
        : ''
    }
    	</p>`
  })
}

export async function transactionSubmitted(id) {
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

export async function confirmAWTTokenClearance() {
  const { isConfirmed } = await swal.fire({
    title: 'Are you sure?',
    text: 'This action will clear your existing AWT token and generate a new token.',
    showDenyButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Yes',
    allowOutsideClick: false,
    denyButtonText: 'No',
    confirmButtonColor: 'green',
    footer: 'This action does not impact your account balance.'
  })
  return isConfirmed
}

export async function gotAnEnterpriseAccount() {
  const { isConfirmed: hasPayer } = await swal.fire({
    title: 'Got Enterprise Access?',
    html: 'Clicking Yes will generate a new access token for you with Enterprise access.',
    allowOutsideClick: false,
    icon: 'info',
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'Cancel',
    confirmButtonColor: 'green',
    footer: `Users with Enterprise access do not pay transaction fees or need ${PRIMARY_TOKEN} to access the network.`
  })
  return hasPayer
}

export async function regenerateGatewayToken() {
  const { isConfirmed: isGenerateNewToken } = await swal.fire({
    title: 'Regenerate Gateway Token',
    text: 'This operation will generate a new AWT token for you to access the chain via the Gateway.',
    allowOutsideClick: false,
    icon: 'warning',
    confirmButtonText: 'Confirm',
    confirmButtonColor: 'green',
    denyButtonColor: 'red',
    showDenyButton: true,
    denyButtonText: 'Cancel',
    footer: 'Your Enterprise status will be retained.'
  })
  return isGenerateNewToken
}
