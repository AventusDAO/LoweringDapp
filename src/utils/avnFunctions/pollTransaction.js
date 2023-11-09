import getToken from "../awt/generateAwtToken";
import { jsonRpcRequest } from "../jsonRpcRequest";
import { showUserTransactionStatus } from "../someUIpopups";
/*
Polls for the state of a transaction
*/

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRequestId({ requestId, params }) {
    const url = params.AVN_GATEWAY_URL;
    const explorerTxUrl = params.EXPLORER_TX_URL;
    const aventusUser = params.aventusUser;

    for (let i = 0; i < 100; i++) {
        await sleep(1000);
        const params = { requestId };
        const { awtToken, hasPayer } = await getToken(aventusUser);
        const polledState = await jsonRpcRequest({
            awtToken,
            hasPayer,
            account: aventusUser,
            url,
            suffix: "poll",
            method: "requestState",
            params,
        });
        const state = await showUserTransactionStatus(
            polledState,
            explorerTxUrl
        );
        if (polledState === undefined) {
            break;
        }
        if (state === "complete") {
            break;
        }
    }
}

export { checkRequestId };
