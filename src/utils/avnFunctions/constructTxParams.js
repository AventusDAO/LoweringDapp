import { jsonRpcRequest } from "../jsonRpcRequest";
import genUserSig from "./genUserSig";
import getToken from "../awt/generateAwtToken";
import genFeePaymentSig from "./genFeePaymentSig";
import { signingErrorHandler } from "../errorHandlers";
import { transactionSubmitted } from "../someUIpopups";
import { isBalanceSufficient } from "./isBalanceSufficient";

/* Generates all the params required to eventually send the lower transaction to the Gateway
This function requires multiple signature prompts from the user's substrate browser extension
*/
export default async function sendTransaction(params) {
    const aventusUser = params.aventusUser;
    const amount = params.amount;
    const relayer = params.relayer;
    const url = params.AVN_GATEWAY_URL;
    const method = params.method;
    const t1Recipient = params.t1Recipient;
    const payer = aventusUser.address;
    const tokenAddress = params.tokenAddress;
    const avtAddress = params.avtAddress;

    try {
        const { awtToken, hasPayer } = await getToken(aventusUser);
        const hasSufficientBalance = await isBalanceSufficient({
            params,
            url,
            awtToken,
            hasPayer,
            avtAddress,
        });
        if (hasSufficientBalance) {
            const { userProxySignature, userTokenNonce } = await genUserSig(
                params
            );
            let payerProxySignature, payerNonce;
            if (!hasPayer) {
                ({ payerProxySignature, payerNonce } = await genFeePaymentSig(
                    params,
                    userProxySignature
                ));
            }

            const suffix = "send";

            const completeTxParams = {
                relayer,
                user: aventusUser.address,
                t1Recipient,
                token: tokenAddress,
                amount,
                nonce: userTokenNonce,
                proxySignature: userProxySignature,
                ...(!hasPayer && { payer }),
                ...(!hasPayer && { feePaymentSignature: payerProxySignature }),
                ...(!hasPayer && { paymentNonce: payerNonce }),
            };

            const requestId = await jsonRpcRequest({
                account: aventusUser,
                hasPayer,
                awtToken,
                url,
                suffix,
                method,
                params: completeTxParams,
            });
            if (requestId === null) {
                return null;
            } else {
                transactionSubmitted(requestId);
                return requestId;
            }
        }
    } catch (err) {
        signingErrorHandler(
            "Authentication expired",
            "User cancelled authorisation"
        );
    }
}
