import { keyring } from '@polkadot/ui-keyring'
import { assert, hexToU8a, isHex, u8aToHex } from '@polkadot/util'
import { ethereumEncode, cryptoWaitReady } from '@polkadot/util-crypto'

// Must be run first or the code won't work
cryptoWaitReady().then(() => {
  // load all available addresses and accounts
  keyring.loadAll({ ss58Format: 42, type: 'sr25519' })
})

/* Checks if the input is valid and returns a valid result
If either a polkadot public key or address, it returns the generic ss58 address, regardless of the ss58 format supplied
If an evm address, it returns the same evm address.
*/
export function toAddress(value, allowIndices = false) {
  if (value) {
    try {
      const u8a = isHex(value) ? hexToU8a(value) : keyring.decodeAddress(value)
      assert(
        allowIndices || u8a.length === 32 || u8a.length === 20,
        'AccountIndex values not allowed'
      )
      if (u8a.length === 20) {
        return ethereumEncode(u8a)
      } else {
        return u8aToHex(u8a)
      }
    } catch (error) {
      // noop, undefined return indicates invalid/transient
    }
  }

  return undefined
}
