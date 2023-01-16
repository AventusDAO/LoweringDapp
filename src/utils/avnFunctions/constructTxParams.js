import { jsonRpcRequest } from "../jsonRpcRequest";
import getToken from "../awt/generateAwtToken";
import { generateFeePaymentSignature } from "../awt/generateOfflineSignatureInjected";
import { signingErrorHandler } from "../errorHandlers";
import { userGeneratesTransferSignatureOffline } from "../awt/userGeneratesTransferSignatureOffline.js";
import { userConfirmation, transactionSubmitted } from "../someUIpopups";

/* Generates all the params required to eventually send the lower transaction to the Gateway
This function requires multiple signature prompts from the user's substrate browser extension
*/
export default async function sendTransaction(sender, params, method, url) {
    // try {
    const awtToken = await getToken(sender);
    if (awtToken !== undefined) {
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
        if (userTokenNonce !== null) {
            // signature #2
            const result2 = await userConfirmation(
                "to generate a signature to authorise proxy payment",
                "You do not pay for this operation"
            );
            if (result2) {
                const awtToken = await getToken(sender);

                if (awtToken !== undefined) {
                    const userProxySignature =
                        await userGeneratesTransferSignatureOffline(
                            params.relayer,
                            sender,
                            params.token,
                            params.amount,
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
                    if (relayerFee !== null) {
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
                        if (payerNonce !== null) {
                            const paymentSignatureParams = {
                                relayer: params.relayer,
                                user: sender.address,
                                proxySignature: userProxySignature,
                                relayerFee: relayerFee,
                                paymentNonce: payerNonce,
                            };
                            // signature #3
                            if (userProxySignature) {
                                const result3 = await userConfirmation(
                                    "and submit your transaction to the blockchain",
                                    "You are NOW paying to submit your transaction."
                                );
                                if (result3) {
                                    const awtToken = await getToken(sender);
                                    if (awtToken !== undefined) {
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
                                            feePaymentSignature:
                                                payerProxySignature,
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
                                        transactionSubmitted(requestId);
                                        return requestId;
                                    } else {
                                        signingErrorHandler(
                                            "Unable to Generate User's AWT. Previous token expired.",
                                            "User cancelled new generation process"
                                        );
                                    }
                                }
                            }
                        }
                    }
                } else {
                    signingErrorHandler(
                        "Unable to Generate User's AWT. Previous token expired.",
                        "User cancelled new generation process"
                    );
                }
            }
        }
    } else {
        signingErrorHandler(
            "Unable to Generate User's AWT",
            "User cancelled process"
        );
    }
}
