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
        swal.fire({
            title: "Need Your Signature!",
            text: "This signature will authenticate you and generate the AWT token unique to your account",
            showDenyButton: true,
            denyButtonText: "Don't Sign",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed) {
                getToken(sender).then((awtToken) => {
                    console.log(awtToken);

                    const suffix = "send";
                    const userNonceParams = {
                        accountId: sender.address,
                        nonceType: "token",
                    };

                    jsonRpcRequest(
                        awtToken,
                        url,
                        "query",
                        "getNonce",
                        userNonceParams,
                        "userTokenNonce is about to start"
                    ).then((userTokenNonce) => {
                        console.log(userTokenNonce);
                        console.log("here", userTokenNonce);
                        swal.fire({
                            title: "Need Your Signature!",
                            text: "This signature will authenticate you to query the nonce of your account",
                            showDenyButton: true,
                            denyButtonText: "Don't Sign",
                            confirmButtonColor: "green",
                        }).then((result) => {
                            userGeneratesTransferSignatureOffline(
                                params.relayer,
                                sender,
                                params.token,
                                params.token_amount,
                                params.t1Recipient,
                                userTokenNonce
                            ).then((userProxySignature) => {
                                const relayerFeeParams = {
                                    relayer: params.relayer,
                                    user: sender.address,
                                    transactionType: method,
                                };
                                jsonRpcRequest(
                                    awtToken,
                                    url,
                                    "query",
                                    "getRelayerFees",
                                    relayerFeeParams,
                                    "relayerFee is about to start"
                                ).then((relayerFee) => {
                                    const payerNonceParams = {
                                        accountId: sender.address,
                                        nonceType: "payment",
                                    };
                                    // a process starts here
                                    jsonRpcRequest(
                                        awtToken,
                                        url,
                                        "query",
                                        "getNonce",
                                        payerNonceParams,
                                        "payerNonce is about to start"
                                    ).then((payerNonce) => {
                                        const paymentSignatureParams = {
                                            relayer: params.relayer,
                                            user: sender.address,
                                            proxySignature: userProxySignature,
                                            relayerFee: relayerFee,
                                            paymentNonce: payerNonce,
                                        };
                                        swal.fire({
                                            title: "Need Your Signature!",
                                            text: "This signature will authenticate you to query the nonce of your account",
                                            showDenyButton: true,
                                            denyButtonText: "Don't Sign",
                                            confirmButtonColor: "green",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                generateFeePaymentSignature(
                                                    sender,
                                                    paymentSignatureParams
                                                ).then(
                                                    (payerProxySignature) => {
                                                        const lowerTokensParams =
                                                            {
                                                                relayer:
                                                                    params.relayer,
                                                                user: sender.address,
                                                                payer: sender.address,
                                                                t1Recipient:
                                                                    params.t1Recipient,
                                                                token: params.token,
                                                                amount: params.amount,
                                                                proxySignature:
                                                                    userProxySignature,
                                                                feePaymentSignature:
                                                                    payerProxySignature,
                                                                paymentNonce:
                                                                    payerNonce,
                                                            };
                                                        jsonRpcRequest(
                                                            awtToken,
                                                            url,
                                                            suffix,
                                                            method,
                                                            lowerTokensParams,
                                                            "tx to lower tokens"
                                                        ).then((requestId) => {
                                                            return requestId;
                                                        });
                                                    }
                                                );
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });

        // // lower token from aventus to ethereum
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
