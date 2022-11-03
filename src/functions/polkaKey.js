const { decodeAddress } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

function tryGetAvnAccountAddress(accountString) {
    try {
        return u8aToHex(decodeAddress(accountString));
    } catch (e) {
        return null;
    }
}

export default tryGetAvnAccountAddress;
