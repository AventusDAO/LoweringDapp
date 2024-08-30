import { metamaskConnectionErrorHandler } from '../errorPopups/walletErrorPopups'
import { transactionErrorHandler } from '../errorPopups/TxErrorPopups'
import { txLinkInAlert } from '../randomFunctions'

// Handles the EVM transaction submission
export async function claimNow({
  leaf,
  merklePath,
  claimData,
  ethereumAccount,
  bridgeContract,
  method
}) {
  merklePath = merklePath ? merklePath.replace(/\[|\]/g, '').split(',') : ''

  if (ethereumAccount) {
    // Calls the claim submit handler to submit the claim transaction and output the result to the user
    if (method === 'old') {
      try {
        await bridgeContract.methods
          .legacyLower(leaf, merklePath)
          .send({ from: ethereumAccount })
          .on('transactionHash', hash => {
            txLinkInAlert({ hash })
          })
          .catch(e => {
            transactionErrorHandler(e.message)
          })
      } catch (err) {}
    } else if (method === 'new') {
      try {
        await bridgeContract.methods
          .claimLower(claimData)
          .send({ from: ethereumAccount })
          .on('transactionHash', hash => {
            txLinkInAlert({ hash })
          })
          .catch(e => {
            transactionErrorHandler(e.message)
          })
      } catch (err) {}
    }
  } else {
    metamaskConnectionErrorHandler()
  }
}
