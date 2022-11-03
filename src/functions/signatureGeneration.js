import AVN_API from "avn-api";

async function userGeneratesTransferSignatureOnline(
    relayer,
    sender,
    recipient,
    token,
    amount,
    userTokenNonce
) {
    let user_api = new AVN_API(null, { suri: user1_seed });
    await user_api.init();

    const tokenTransferParams = {
        relayer: relayer,
        user: sender,
        recipient: recipient,
        token: token,
        amount: amount,
        nonce: userTokenNonce,
    };
    return user_api.proxy.generateProxySignature(
        "proxyTokenTransfer",
        tokenTransferParams
    );
}

async function generateFeePaymentSignatureOnline(
    relayer,
    sender,
    proxySignature,
    relayerFee,
    paymentNonce
) {
    const payer_api = new AVN_API(null, { suri: user1_seed });
    await payer_api.init();

    const paymentSignatureParams = {
        relayer: relayer,
        user: sender,
        proxySignature: proxySignature,
        relayerFee: relayerFee,
        paymentNonce: paymentNonce,
    };
    const paymentSignature = payer_api.proxy.generateFeePaymentSignature(
        paymentSignatureParams
    );
    console.log(paymentSignature);
    return paymentSignature;
}

export {
    generateFeePaymentSignatureOnline,
    userGeneratesTransferSignatureOnline,
};
