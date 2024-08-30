import { substrateNotDetected } from '../errorPopups/walletErrorPopups'

export async function connectSpecificWallet(name) {
  try {
    const specificExtension = window.injectedWeb3[name]
    const extension = await specificExtension.enable()
    const accounts = await extension.accounts.get()
    const signRaw = await extension?.signer?.signRaw
    accounts.forEach(account => {
      account.signer = signRaw
      account.source = name
    })
    return accounts
  } catch (err) {
    substrateNotDetected(name)
  }
}

export const setStorageItems = (address, wallet) => {
  localStorage.setItem('user', address)
  localStorage.setItem('activeExtension', wallet)
}
