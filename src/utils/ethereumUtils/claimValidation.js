import { genericErrorHandlerTemplate } from '../errorPopups/genericErrorPopups'
import { toAddress } from '../polkadotUtils/polkadotToAddress'

export async function validateInput({ account, userLowerId }) {
  try {
    if (account === '' && userLowerId === '') {
      throw await genericErrorHandlerTemplate(
        'Invalid Input',
        'One of the two fields must be filled'
      )
    }

    if (account) {
      if (accountValidation({ account })) {
        return account
      }
    } else if (userLowerId) {
      return userLowerId
    }
  } catch (err) {
    console.log(err)
  }
}

function accountValidation({ account }) {
  if (toAddress(account)) {
    return true
  } else {
    genericErrorHandlerTemplate(
      'Invalid Address',
      'Please ensure the address is correct or search using just the LowerID'
    )
  }
}
