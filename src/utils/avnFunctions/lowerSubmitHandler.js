import sendTransaction from "./constructTxParams";
import { checkRequestId } from "./pollTransaction";

/*
This file handles the lower transactions for all four lower options.
Also handles the claiming of tokens on ethereum using the lower data returned from the backend.
*/

export async function lowerSubmitHandler({
    aventusUser,
    tokenAddress,
    avtAddress,
    amount,
    tokenType,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER,
    EXPLORER_TX_URL,
}) {
    const method = "proxyTokenLower";
    const params = {
        relayer: AVN_RELAYER,
        aventusUser,
        t1Recipient,
        tokenAddress,
        avtAddress,
        tokenType,
        amount,
        method,
        AVN_GATEWAY_URL,
        EXPLORER_TX_URL,
    };

    const requestId = await sendTransaction(params);
    if (requestId) {
        await checkRequestId({
            requestId,
            params,
        });
    }
}
