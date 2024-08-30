import { balanceFormatter } from '../randomFunctions'
import { gatewayAccessError } from '../errorPopups/networkAccessErrorPopups'
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/

// This function ensures that the user can only lower from the free balance.
export async function getMainTokenFreeBalance({ params }) {
  try {
    const bal = await params?.api.query.getAccountInfo(
      params.substrateUser.address
    )
    const userFreeBalance = bal.freeBalance
    return userFreeBalance
  } catch (err) {
    if (err.message.includes('403')) {
      const result = await gatewayAccessError(params._hasPayer)
      params.set_HasPayer(result)
    }
    return null
  }
}

export async function getTokenBalance({ params }) {
  try {
    const tokenBalance = await params?.api.query.getTokenBalance(
      params.substrateUser.address,
      params.tokenAddress
    )
    return tokenBalance
  } catch (err) {
    if (err.message.includes('403')) {
      const result = await gatewayAccessError(params._hasPayer)
      params.set_HasPayer(result)
    }
  }
}

export async function ercTokenBalanceHandler({
  tokenType,
  tokenAddress,
  substrateUser,
  api,
  isBalanceTab,
  _hasPayer,
  PRIMARY_TOKEN_ADDRESS,
  set_HasPayer
}) {
  const params = {
    tokenAddress,
    substrateUser,
    _hasPayer,
    api,
    isBalanceTab,
    set_HasPayer
  }
  let balance

  try {
    if (PRIMARY_TOKEN_ADDRESS.length === 0) {
      balance = await getTokenBalance({
        params
      })
    } else {
      if (PRIMARY_TOKEN_ADDRESS === tokenAddress) {
        balance = await getMainTokenFreeBalance({
          params
        })
      } else {
        balance = await getTokenBalance({
          params
        })
      }
    }
    if (balance) {
      return await balanceFormatter({ tokenType, balance })
    } else {
      return null
    }
  } catch (err) {}
}

export async function nativeTokenBalanceHandler({
  tokenType,
  tokenAddress,
  substrateUser,
  api,
  isBalanceTab,
  _hasPayer,
  PRIMARY_TOKEN,
  set_HasPayer
}) {
  const params = {
    tokenAddress,
    substrateUser,
    _hasPayer,
    api,
    isBalanceTab,
    set_HasPayer
  }

  let balance

  try {
    if (PRIMARY_TOKEN === tokenType) {
      balance = await getMainTokenFreeBalance({
        params
      })
    } else {
      balance = await getTokenBalance({
        params
      })
    }
    if (balance) {
      return await balanceFormatter({ tokenType, balance })
    } else {
      return null
    }
  } catch (err) {}
}

export async function mainTokenBalanceHandler({
  tokenType,
  tokenAddress,
  substrateUser,
  api,
  isBalanceTab,
  _hasPayer,
  set_HasPayer
}) {
  const params = {
    tokenAddress,
    substrateUser,
    _hasPayer,
    api,
    isBalanceTab,
    set_HasPayer
  }
  let balance

  try {
    balance = await getMainTokenFreeBalance({
      params
    })

    if (balance) {
      return await balanceFormatter({ tokenType, balance })
    } else {
      return null
    }
  } catch (err) {}
}
