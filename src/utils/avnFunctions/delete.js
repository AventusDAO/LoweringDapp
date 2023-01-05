import { jsonRpcRequest } from "../jsonRpcRequest";
import getToken from "../awt/generateAwtToken";
import { generateFeePaymentSignature } from "../awt/generateOfflineSignatureInjected";
import { gatewayAccessError } from "../errorHandlers";
import { userGeneratesTransferSignatureOffline } from "../awt/userGeneratesTransferSignatureOffline.js";
import swal from "sweetalert2";
import { transactionErrorHandler } from "../errorHandlers";

export async function genTransferSig(
    result2,
    params,
    sender,
    userTokenNonce,
    method,
    url
) {
    if (result2) {
        const awtToken = await getToken(sender);
        const userProxySignature = await userGeneratesTransferSignatureOffline(
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
    }
}
export async function genFeePaySig(
    result3,
    params,
    sender,
    paymentSignatureParams,
    userProxySignature,
    payerNonce,
    url,
    suffix,
    method
) {
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
