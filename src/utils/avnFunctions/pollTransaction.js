import getToken from "../awt/generateAwtToken";
import { jsonRpcRequest } from "../jsonRpcRequest";
import { showUserTransactionStatus } from "../someUIpopups";
/*
Polls for the state of a transaction
*/

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRequestId(requestId, sender, url, explorerTxUrl) {
    for (let i = 0; i < 50; i++) {
        await sleep(2000);
        const params = { requestId };
        const awtToken = await getToken(sender);
        const polledState = await jsonRpcRequest(
            awtToken,
            url,
            "poll",
            "requestState",
            params,
            "polling"
        );
        const state = await showUserTransactionStatus(polledState, explorerTxUrl);
        if (state === null) {
            break;
        }
    }
}

export { checkRequestId };
