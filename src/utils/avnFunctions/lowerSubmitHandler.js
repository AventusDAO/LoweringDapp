import sendTransaction from "./constructTxParams";
import { tokenAmountChecker } from "../ethereumFunctions/decimalHandler";
import { checkRequestId } from "./pollTransaction";

/*
This file handles the lower transactions for all four lower options.
Also handles the withdrawal of tokens on ethereum using the lower data returned from the backend.
*/

export async function lowerSubmitHandler(
    sender,
    token,
    tokenAmount,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER,
    isERC20,
    isERC777
) {
    const _tokenAmount = await tokenAmountChecker(
        tokenAmount,
        token,
        isERC20,
        isERC777
    );
    const params = {
        relayer: AVN_RELAYER,
        user: sender.address,
        payer: sender.address,
        t1Recipient,
        token: token,
        amount: _tokenAmount,
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
            await checkRequestId(requestId, sender, AVN_GATEWAY_URL);
            return "done";
        }
    } catch (e) {
        console.error(e);
    }
}
