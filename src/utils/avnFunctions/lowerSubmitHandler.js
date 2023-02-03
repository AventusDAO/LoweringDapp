import sendTransaction from "./constructTxParams";
import { checkRequestId } from "./pollTransaction";

/*
This file handles the lower transactions for all four lower options.
Also handles the claiming of tokens on ethereum using the lower data returned from the backend.
*/

export async function lowerSubmitHandler(
    sender,
    token,
    tokenAmount,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER,
    EXPLORER_TX_URL
) {
    const params = {
        relayer: AVN_RELAYER,
        user: sender.address,
        payer: sender.address,
        t1Recipient,
        token: token,
        amount: tokenAmount,
        proxySignature: "",
        feePaymentSignature: "",
        paymentNonce: "",
    };

    const method = "proxyTokenLower";
    try {
        const requestId = await sendTransaction(
            sender,
            params,
            method,
            AVN_GATEWAY_URL
        );
        if (requestId) {
            await checkRequestId(requestId, sender, AVN_GATEWAY_URL, EXPLORER_TX_URL);
            return "done";
        }
    } catch (e) {
        console.error(e);
    }
}
