import { jsonRpcRequest } from "../jsonRpcRequest";

export async function getRelayerFees({ relayer, aventusUser, url, awtToken }) {
    const relayerFeeParams = {
        relayer,
        user: aventusUser.address,
        transactionType: "proxyTokenLower",
    };

    const relayerFee = await jsonRpcRequest({
        awtToken,
        url,
        suffix: "query",
        method: "getRelayerFees",
        params: relayerFeeParams,
    });
    return relayerFee;
}
