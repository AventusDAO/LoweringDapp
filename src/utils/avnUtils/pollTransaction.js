import {
  cannotConfirmTxStatus,
  showUserStakeTxStatus
} from '../txConfirmationPopups'

/*
Polls for the state of a transaction
*/

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function checkRequestId({ api, requestId, params }) {
  const explorerTxUrl = params.EXPLORER_TX_URL

  for (let i = 0; i < 100; i++) {
    await sleep(6000)
    const polledState = await api.poll.requestState(requestId)
    if (i === 19 && polledState?.status === 'Pending') {
      await cannotConfirmTxStatus({
        polledState,
        explorerTxUrl
      })
      break
    }
    if (polledState?.status === 'Processed') {
      await showUserStakeTxStatus({
        polledState,
        explorerTxUrl
      })
      break
    }

    if (polledState === undefined) {
      break
    }
  }
}

export { sleep, checkRequestId }
