import { jsonRpcRequest } from "../jsonRpcRequest";
import { userConfirmation } from "../someUIpopups";
import { generateFeePaymentSignature } from "../awt/generateOfflineSignatureInjected";
import getToken from "../awt/generateAwtToken";
import balanceConverter from "ethereum-unit-converter";

export default async function genFeePaymentSig(params, userProxySignature) {
    const aventusUser = params.aventusUser;
    const url = params.AVN_GATEWAY_URL;
    const method = params.method;
    const { awtToken, hasPayer } = await getToken(aventusUser);

    const relayerFeeParams = {
        relayer: params.relayer,
        user: aventusUser.address,
        transactionType: method,
    };

    const relayerFee = await jsonRpcRequest({
        account: aventusUser,
        awtToken,
        hasPayer,
        url,
        suffix: "query",
        method: "getRelayerFees",
        params: relayerFeeParams,
    });
    if (relayerFee) {
        const payerNonceParams = {
            accountId: aventusUser.address,
            nonceType: "payment",
        };

        const payerNonce = await jsonRpcRequest({
            account: aventusUser,
            awtToken,
            hasPayer,
            url,
            suffix: "query",
            method: "getNonce",
            params: payerNonceParams,
        });

        if (payerNonce) {
            const paymentSignatureParams = {
                relayer: params.relayer,
                user: aventusUser.address,
                proxySignature: userProxySignature,
                relayerFee: relayerFee,
                paymentNonce: payerNonce,
                signer: aventusUser,
            };

            if (userProxySignature) {
                const isConfirmed = await userConfirmation(
                    "submit the transaction",
                    `This operation incurs a small fee of ${balanceConverter(
                        relayerFee,
                        "wei",
                        "ether"
                    )} AVT fee`
                );
                if (isConfirmed) {
                    const { awtToken } = await getToken(aventusUser);

                    if (awtToken) {
                        const payerProxySignature =
                            await generateFeePaymentSignature(
                                paymentSignatureParams
                            );

                        return { payerProxySignature, payerNonce };
                    }
                }
            }
        }
    }
}
