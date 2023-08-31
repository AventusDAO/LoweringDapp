import common from "avn-api/lib/common";
import { hexToU8a, u8aToHex, u8aConcat } from "@polkadot/util";
import { transactionErrorHandler, signingErrorHandler } from "../errorHandlers";

const SIGNING_CONTEXT = "awt_gateway_api";

async function generateAwtPayload({
    signer,
    userAddress,
    publicKey,
    issuedAt,
    hasPayer,
}) {
    const avnPublicKey = publicKey;
    const encodedData = encodeAvnPublicKeyForSigning({
        avnPublicKey,
        issuedAt,
        hasPayer,
    });
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
            hasPayer,
        };
    } else {
        signingErrorHandler("Unable to authenticate user");
        return undefined;
    }
}

function encodeAvnPublicKeyForSigning({ avnPublicKey, hasPayer, issuedAt }) {
    const encodedContext = common.registry.createType("Text", SIGNING_CONTEXT);
    const encodedPublicKey = common.registry.createType(
        "AccountId",
        hexToU8a(avnPublicKey)
    );
    const encodedIssuedAt = common.registry.createType("Text", issuedAt);

    if (!hasPayer) {
        const encodedData = u8aConcat(
            encodedContext.toU8a(false),
            encodedPublicKey.toU8a(true),
            encodedIssuedAt.toU8a(false)
        );
        return u8aToHex(encodedData);
    } else {
        const encodedHasPayer = common.registry.createType("bool", hasPayer);

        const encodedData = u8aConcat(
            encodedContext.toU8a(false),
            encodedPublicKey.toU8a(true),
            encodedIssuedAt.toU8a(false),
            encodedHasPayer.toU8a(true)
        );
        return u8aToHex(encodedData);
    }
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
