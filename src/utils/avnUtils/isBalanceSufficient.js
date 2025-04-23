import { balanceChecker } from './balanceChecker'
import { hasPayerBalanceChecker } from './hasPayerBalanceChecker'
import {
  getMainTokenFreeBalance,
  getPreditionMarketTokenBalance,
  getTokenBalance
} from './queryBalance'
import BigNumber from 'big-number/big-number'
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account.
*/
const token = window?.appConfig?.SUPPORTED_TOKENS[0]
const lowerTransactionType = 'proxyTokenLower'

export async function isBalanceSufficient({ params }) {
  try {
    const userFreeBalance = await getMainTokenFreeBalance({
      params
    })
    let ercTokenBalance

    if (params.tokenType !== 'TOKEN') {
      if (params.method === 'lowerFromPredictionMarket') {
        ercTokenBalance = await getPreditionMarketTokenBalance({ params })
      } else if (params.tokenType === token) {
        ercTokenBalance = await getMainTokenFreeBalance({ params })
      } else {
        ercTokenBalance = await getTokenBalance({ params })
      }
    }

    let relayerFee
    if (!params._hasPayer) {
      const nativeCurrency = await params?.api.query.getNativeCurrencyToken()
      relayerFee = await params?.api.query.getRelayerFees(
        params.relayer,
        nativeCurrency,
        params.substrateUser.address,
        lowerTransactionType
      )

      if (params.method === 'lowerFromPredictionMarket') {
        // This is a batch call so we also need the relayer fee for withdrawing from prediction market
        const relayerFeePredictionMarket =
          await params?.api.query.getRelayerFees(
            params.relayer,
            nativeCurrency,
            params.substrateUser.address,
            'proxyWithdrawMarketTokens'
          )
        relayerFee = BigNumber(relayerFee).add(
          BigNumber(relayerFeePredictionMarket)
        )
      }
    }

    const calcParams = {
      userFreeBalance,
      amount: params.amount,
      relayerFee: relayerFee.toString(),
      tokenType: params.tokenType,
      ercTokenBalance
    }
    const hasSufficientBalance = params._hasPayer
      ? await hasPayerBalanceChecker('proxyLowerTokenWithoutFee', calcParams)
      : await balanceChecker('proxyLowerTokenWithFee', calcParams)
    return hasSufficientBalance
  } catch (err) {
    console.error(err)
  }
}
