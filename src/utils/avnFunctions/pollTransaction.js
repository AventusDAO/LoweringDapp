import getToken from "../awt/generateAwtToken";
import { jsonRpcRequest } from "../jsonRpcRequest";
import { showUserTransactionStatus } from "../someUIpopups";
/*
Polls for the state of a transaction
*/

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRequestId(requestId, sender, url) {
    for (let i = 0; i < 15; i++) {
        await sleep(5000);
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
        const state = await showUserTransactionStatus(polledState);
        if (state === null) {
            break;
        }
    }
}

export { checkRequestId };
