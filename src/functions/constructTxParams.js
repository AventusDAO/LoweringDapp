import { jsonRpcRequest } from "./jsonRpcRequest";
import { getToken } from "./signAndSendMessage";
import {
    generateProxySignature,
    generateFeePaymentSignature,
} from "./generateOfflineSignatureInjected";
import swal from "sweetalert2";

async function userGeneratesTransferSignatureOffline(
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

async function sendTransaction(sender, params, method, url) {
    try {
        const { isConfirmed: result1 } = await swal.fire({
            title: "Need Your Signature!",
            text: "This signature will authenticate you and generate the AWT token unique to your account",
            showDenyButton: true,
            denyButtonText: "Don't Sign",
            confirmButtonColor: "green",
        });
        console.log(result1);

        if (result1) {
            const awtToken = await getToken(sender);
            console.log(awtToken);

            const suffix = "send";
            const userNonceParams = {
                accountId: sender.address,
                nonceType: "token",
            };

            const userTokenNonce = await jsonRpcRequest(
                awtToken,
                url,
                "query",
                "getNonce",
                userNonceParams,
                "userTokenNonce is about to start"
            );
            console.log(userTokenNonce);

            // signature #2
            const { isConfirmed: result2 } = await swal.fire({
                title: "Need Your Signature!",
                text: "This signature will authenticate you to query the nonce of your account",
                showDenyButton: true,
                denyButtonText: "Don't Sign",
                confirmButtonColor: "green",
            });
            if (result2) {
                const userProxySignature =
                    await userGeneratesTransferSignatureOffline(
                        params.relayer,
                        sender,
                        params.token,
                        params.token_amount,
                        params.t1Recipient,
                        userTokenNonce
                    );
                const relayerFeeParams = {
                    relayer: params.relayer,
                    user: sender.address,
                    transactionType: method,
                };
                const relayerFee = await jsonRpcRequest(
                    awtToken,
                    url,
                    "query",
                    "getRelayerFees",
                    relayerFeeParams,
                    "relayerFee is about to start"
                );
                const payerNonceParams = {
                    accountId: sender.address,
                    nonceType: "payment",
                };

                const payerNonce = await jsonRpcRequest(
                    awtToken,
                    url,
                    "query",
                    "getNonce",
                    payerNonceParams,
                    "payerNonce is about to start"
                );
                const paymentSignatureParams = {
                    relayer: params.relayer,
                    user: sender.address,
                    proxySignature: userProxySignature,
                    relayerFee: relayerFee,
                    paymentNonce: payerNonce,
                };
                // signature #3
                const { isConfirmed: result3 } = await swal.fire({
                    title: "Need Your Signature!",
                    text: "This signature will authenticate you and submit your transaction to the blockchain",
                    showDenyButton: true,
                    denyButtonText: "Don't Sign",
                    confirmButtonColor: "green",
                });
                if (result3) {
                    const payerProxySignature =
                        await generateFeePaymentSignature(
                            sender,
                            paymentSignatureParams
                        );
                    const lowerTokensParams = {
                        relayer: params.relayer,
                        user: sender.address,
                        payer: sender.address,
                        t1Recipient: params.t1Recipient,
                        token: params.token,
                        amount: params.amount,
                        proxySignature: userProxySignature,
                        feePaymentSignature: payerProxySignature,
                        paymentNonce: payerNonce,
                    };
                    const requestId = await jsonRpcRequest(
                        awtToken,
                        url,
                        suffix,
                        method,
                        lowerTokensParams,
                        "tx to lower tokens"
                    );
                    return requestId;
                }
            }
        }
    } catch (err) {
        console.log("err");
    }
}

// TODO waiting on the backend to determine how I'll need this
// async function queryState(method, params) {
//     const queryResponse = await jsonRpcRequest("query", method, params);
// }

// async function checkRequestId(requestId) {
//     for (let i = 0; i < 10; i++) {
//         await sleep(3000);
//         const params = { requestId };
//         console.log(`i==, ${i}`);
//         const polledState = await jsonRpcRequest(
//             "poll",
//             "requestState",
//             params
//         );
//         if (polledState.status === "Processed") {
//             console.log("Transaction processed");
//             break;
//         } else if (polledState.status === "Rejected") {
//             console.log("Transaction failed");
//             break;
//         }
//     }
// }

// async function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const params = {
//     accountId: sender,
//     recipient: user2,
//     contract: avt_contract,
//     amount: amount,
// };

// (async () => {
//     await sendTransaction(sender, params, method, url);
// })();

export default sendTransaction;
