import { jsonRpcRequest } from "../jsonRpcRequest";
import { userConfirmation } from "../someUIpopups";
import getToken from "../awt/generateAwtToken";
import { signingErrorHandler } from "../errorHandlers";
import { generateProxySignature } from "../awt/generateOfflineSignatureInjected";

export default async function genUserSig(params) {
    const aventusUser = params.aventusUser;
    const url = params.AVN_GATEWAY_URL;
    const method = params.method;
    const { awtToken, hasPayer } = await getToken(aventusUser);

    if (awtToken) {
        const userNonceParams = {
            accountId: aventusUser.address,
            nonceType: "token",
        };

        const userTokenNonce = await jsonRpcRequest({
            awtToken,
            account: aventusUser,
            hasPayer,
            url,
            suffix: "query",
            method: "getNonce",
            params: userNonceParams,
        });

        if (userTokenNonce !== null) {
            const isConfirmed = await userConfirmation(
                "authorise the transaction",
                "This operation is free"
            );

            if (isConfirmed) {
                const { awtToken } = await getToken(aventusUser);

                if (awtToken !== undefined) {
                    const txSigParams = {
                        relayer: params.relayer,
                        user: aventusUser.address,
                        token: params.tokenAddress,
                        amount: params.amount,
                        t1Recipient: params.t1Recipient,
                        nonce: userTokenNonce,
                        signer: aventusUser,
                    };

                    const userProxySignature = await generateProxySignature({
                        signer: aventusUser,
                        transactionType: method,
                        proxyArgs: txSigParams,
                    });

                    return { userProxySignature, userTokenNonce };
                } else {
                    signingErrorHandler(
                        "Authentication expired",
                        "User cancelled reauthentication"
                    );
                }
            }
        }
    } else {
        signingErrorHandler(
            "Unable to authenticate user",
            "User cancelled process"
        );
    }
}
