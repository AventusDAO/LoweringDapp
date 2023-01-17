import { u8aToHex, u8aConcat, stringToHex } from "@polkadot/util";
import common from "../../../node_modules/avn-api/lib/common";
import { invalidSubstrateSignature } from "../errorHandlers";
const { signatureVerify } = require("@polkadot/util-crypto");

const numTypes = [
    "AccountId",
    "Balance",
    "BalanceOf",
    "EraIndex",
    "u8",
    "u32",
    "u64",
    "u128",
    "U256",
    "H160",
    "H256",
];

const generateProxySignature = (account, transactionType, proxyArgs) =>
    signing[transactionType](account, proxyArgs);

const signing = {
    proxyTokenLower: async (account, proxyArgs) =>
        await signProxyTokenLower(account, proxyArgs),
};

async function signProxyTokenLower(
    account,
    { relayer, user, token, amount, t1Recipient, nonce }
) {
    relayer = common.convertToPublicKeyIfNeeded(relayer);
    user = common.convertToPublicKeyIfNeeded(user);

    const orderedData = [
        { Text: "authorization for lower operation" },
        { AccountId: relayer },
        { AccountId: user },
        { H160: token },
        { u128: amount },
        { H160: t1Recipient },
        { u64: nonce },
    ];

    const encodedDataToSign = encodeOrderedData(orderedData);
    const v = await signData(account, encodedDataToSign);
    return v;
}

function encodeOrderedData(data) {
    const encodedDataToSign = data.map((d) => {
        const [type, value] = Object.entries(d)[0];
        return type === "SkipEncode"
            ? value
            : common.registry
                  .createType(type, value)
                  .toU8a(numTypes.includes(type));
    });
    return u8aConcat(...encodedDataToSign);
}

// i had to make changes here.
async function signData(account, encodedDataToSign) {
    const signer = account.signer;
    try {
        if (signer) {
            const { signature } = await signer({
                address: account.address,
                data: u8aToHex(encodedDataToSign),
                type: "hex",
            });
            const accountPub = common.convertToPublicKeyIfNeeded(
                account.address
            );
            if (
                verifySignatureWithOrWithoutWrapping(
                    encodedDataToSign,
                    signature,
                    accountPub
                )
            ) {
                return signature;
            } else {
                invalidSubstrateSignature();
                return 0;
            }
        }
    } catch (err) {
        invalidSubstrateSignature();
        return 0;
    }
}

function verifySignatureWithOrWithoutWrapping(
    encodedData,
    signature,
    publicKey
) {
    const message = u8aToHex(encodedData);
    const wrappedMessage =
        stringToHex("<Bytes>") +
        message.substr(2) +
        stringToHex("</Bytes>").substr(2);
    const result =
        signatureVerify(message, signature, publicKey).isValid ||
        signatureVerify(wrappedMessage, signature, publicKey).isValid;
    return result;
}

function generateFeePaymentSignature(
    account,
    { relayer, user, proxySignature, relayerFee, paymentNonce }
) {
    relayer = common.convertToPublicKeyIfNeeded(relayer);
    user = common.convertToPublicKeyIfNeeded(user);
    const proxyProofData = [
        { AccountId: user },
        { AccountId: relayer },
        { MultiSignature: { Sr25519: proxySignature } },
    ];
    const orderedData = [
        { Text: "authorization for proxy payment" },
        { SkipEncode: encodeOrderedData(proxyProofData) },
        { AccountId: relayer },
        { Balance: relayerFee },
        { u64: paymentNonce },
    ];
    const encodedDataToSign = encodeOrderedData(orderedData);
    return signData(account, encodedDataToSign);
}

export { generateProxySignature, generateFeePaymentSignature };
