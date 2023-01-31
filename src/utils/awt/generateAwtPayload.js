import common from "avn-api/lib/common";
import { hexToU8a, u8aToHex, u8aConcat } from "@polkadot/util";
import { transactionErrorHandler, signingErrorHandler } from "../errorHandlers";

const SIGNING_CONTEXT = "awt_gateway_api";

async function generateAwtPayload(signer, userAddress, publicKey, issuedAt) {
    const avnPublicKey = publicKey;
    const encodedData = encodeAvnPublicKeyForSigning(avnPublicKey, issuedAt);
    const signature = await signWithPolkadotExtension(
        signer,
        encodedData,
        userAddress
    );
    if (signature) {
        return {
            pk: avnPublicKey,
            iat: issuedAt,
            sig: signature,
        };
    } else {
        signingErrorHandler("Unable to authenticate user");
        return undefined;
    }
}

function encodeAvnPublicKeyForSigning(avnPublicKey, issuedAt) {
    const encodedData = u8aConcat(
        common.registry.createType("Text", SIGNING_CONTEXT).toU8a(false),
        common.registry
            .createType("AccountId", hexToU8a(avnPublicKey))
            .toU8a(true),
        common.registry.createType("Text", issuedAt).toU8a(false)
    );
    return u8aToHex(encodedData);
}

async function signWithPolkadotExtension(signer, encodedData, userAddress) {
    const signR = signer;
    try {
        if (!!signR) {
            const { signature } = await signR({
                address: userAddress,
                data: encodedData,
                type: "bytes",
            });
            return signature;
        }
    } catch (err) {
        transactionErrorHandler("Unable to Generate User Signature");
    }
}

export default generateAwtPayload;
