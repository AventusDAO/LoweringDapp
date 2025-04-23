import { signingErrorHandler } from '../errorPopups/walletErrorPopups'
import { isBalanceSufficient } from './isBalanceSufficient'
import { userConfirmation } from '../someUIpopups'
import { substrateConnectFailure } from '../errorPopups/walletErrorPopups'

/* Generates all the params required to eventually send the lower transaction to the Gateway
This function requires multiple signature prompts from the user's substrate browser extension
*/
export default async function sendTransaction(params) {
  try {
    if (await userConfirmation()) {
      let hasSufficientBalance
      if (params?.substrateUser.address) {
        hasSufficientBalance = await isBalanceSufficient({
          params
        })
      } else {
        substrateConnectFailure()
      }
      params.amount = hasSufficientBalance.amount.toString()
      if (hasSufficientBalance.value) {
        const requestId = await params?.api.send[params.method](
          params.t1Recipient,
          params.tokenAddress,
          params.amount
        )
        if (requestId === null) {
          return null
        } else {
          return requestId
        }
      }
    }
  } catch (err) {
    console.error(err)
    signingErrorHandler(
      'Authentication expired',
      'User cancelled authorisation'
    )
  }
}
