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
      const transactionId = getTransactionIdByHash(polledState.txHash, explorerTxUrl)
      await cannotConfirmTxStatus({
        polledState,
        explorerTxUrl,
        transactionId
      })
      break
    }
    if (polledState?.status === 'Processed') {
      const transactionId = getTransactionIdByHash(polledState.txHash, explorerTxUrl)
      await showUserStakeTxStatus({
        polledState,
        explorerTxUrl,
        transactionId
      })
      break
    }

    if (polledState === undefined) {
      break
    }
  }
}

async function getTransactionIdByHash(transactionHash, archiveUrl) {
  if (!transactionHash || typeof transactionHash !== 'string') {
    throw new Error('Transaction hash must be a valid string');
  }

  const query = `
    query ExtrinsicQuery {
      extrinsics(where: {hash_eq: "${transactionHash}"}, limit: 10) {
        id
      }
    }
  `;

  try {
    const response = await fetch(archiveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.extrinsics[0].id;
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    throw error;
  }
}

export { sleep, checkRequestId }
