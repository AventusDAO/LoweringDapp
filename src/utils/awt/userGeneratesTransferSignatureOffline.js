import { generateProxySignature } from "../awt/generateOfflineSignatureInjected";

export async function userGeneratesTransferSignatureOffline(
    relayer,
    sender,
    token,
    amount,
    t1Recipient,
    userTokenNonce
) {
    const tokenLowerParams = {
        relayer: relayer,
        user: sender.address,
        t1Recipient: t1Recipient,
        token: token,
        amount: amount,
        nonce: userTokenNonce,
    };
    return generateProxySignature(sender, "proxyTokenLower", tokenLowerParams);
}
