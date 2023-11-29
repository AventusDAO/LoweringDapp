const { decodeAddress, encodeAddress } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

export default function tryGetAvnAccountAddress(accountString) {
    try {
        if (accountString.length === 48) {
            return u8aToHex(decodeAddress(accountString));
        } else {
            return encodeAddress(accountString);
        }
    } catch (e) {
        return null;
    }
}
