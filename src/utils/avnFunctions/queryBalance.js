import { transactionErrorHandler, gatewayAccessError } from "../errorHandlers";
import AVN_API from "avn-api";
import getToken from "../awt/generateAwtToken";
import { substrateConnectFailure } from "../errorHandlers";
import { balanceFormatter } from "../randomFunctions";
/*
Constructs the params for the balance and the url...
Requires a valid token to get the account balance.
Queries the balance of an account. 
*/

const API = new AVN_API();

async function balanceHandler(type, account, method, AVN_GATEWAY_URL, token) {
    const url = `${AVN_GATEWAY_URL}query`;
    const tokenParams = {
        accountId: account.address,
        token: token,
    };
    const avtParams = {
        accountId: account.address,
    };
    const params = token ? tokenParams : avtParams;

    if (!account.address) {
        substrateConnectFailure();
    } else {
        await signAndQueryBalance(type, account, params, method, url);
    }
}

async function signAndQueryBalance(type, account, params, method, url) {
    await API.init();
    try {
        const res = await getToken(account);
        if (res) {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${res}`,
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: method,
                    params: params,
                    id: 1,
                }),
            });
            if (response.status === 200) {
                response.json().then((res) => {
                    balanceFormatter(type, res);
                });
            } else if (response.status === 403) {
                gatewayAccessError();
            } else {
                transactionErrorHandler(response.status);
            }
        }
    } catch (err) {}
}

export { signAndQueryBalance, balanceHandler };
