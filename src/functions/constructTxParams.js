import { jsonRpcRequest } from "./jsonRpcRequest";
import getToken from "./generateAwtToken";
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

/* Generates all the params required to eventually send the lower transaction to the Gateway
This function requires multiple signature prompts from the user's substrate browser extension
*/
async function sendTransaction(sender, params, method, url) {
    try {
        const awtToken = await getToken(sender);
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

        // signature #2
        const { isConfirmed: result2 } = await swal.fire({
            title: "Need Your Signature!",
            text: "This signature will authenticate you to query the nonce of your account",
            showDenyButton: true,
            denyButtonText: "Don't Sign",
            confirmButtonColor: "green",
        });
        if (result2) {
            const awtToken = await getToken(sender);
            const userProxySignature =
                await userGeneratesTransferSignatureOffline(
                    params.relayer,
                    sender,
                    params.token,
                    params.tokenAmount,
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
                const awtToken = await getToken(sender);
                const payerProxySignature = await generateFeePaymentSignature(
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
    } catch (e) {
        console.log(e);
    }
}

// TODO waiting on the backend to determine how I'll need this
// async function queryState(method, params) {
//     const queryResponse = await jsonRpcRequest("query", method, params);
// }

// const params = {
//     accountId: sender,
//     recipient: user2,
//     contract: avtContract,
//     amount: amount,
// };

// (async () => {
//     await sendTransaction(sender, params, method, url);
// })();

export default sendTransaction;
