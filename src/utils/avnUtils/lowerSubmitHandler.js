import sendTransaction from './constructTxParams'
import { checkRequestId, sleep } from './pollTransaction'
import { TxSubmitted } from '../txConfirmationPopups'
import {
  gatewayAccessErrorForNoPayer,
  gatewayAccessErrorForNoMinimumBalance
} from '../errorPopups/networkAccessErrorPopups'

/*
This file handles the lower transactions for all four lower options.
Also handles the claiming of tokens on the evm network using the lower data returned from the backend.
*/

export async function lowerSubmitHandler({
  substrateUser,
  tokenAddress,
  amount,
  tokenType,
  t1Recipient,
  api,
  _hasPayer,
  set_HasPayer,
  AVN_RELAYER,
  EXPLORER_TX_URL,
  ARCHIVE_EXPLORER_URL
}) {
  const params = {
    relayer: AVN_RELAYER,
    substrateUser,
    t1Recipient,
    api,
    _hasPayer,
    set_HasPayer,
    tokenAddress,
    tokenType,
    amount,
    method: 'proxyTokenLower',
    EXPLORER_TX_URL,
    ARCHIVE_EXPLORER_URL
  }

  try {
    const requestId = await sendTransaction(params)
    if (requestId) {
      await TxSubmitted(requestId)
      await sleep(3000)
      await checkRequestId({
        api: params.api,
        requestId,
        params
      })
      return true
    }
  } catch (err) {
    if (err.message.includes('403')) {
      const result = _hasPayer
        ? await gatewayAccessErrorForNoPayer()
        : await gatewayAccessErrorForNoMinimumBalance()
      set_HasPayer(result)
    }
  }
}
