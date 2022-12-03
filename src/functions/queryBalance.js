import { transactionErrorHandler, gatewayAccessError } from "./errorHandlers";
import AVN_API from "avn-api";
import swal from "sweetalert2";
import getToken from "./generateAwtToken";
import { substrateConnectFailure } from "./errorHandlers";

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
        signAndQueryBalance(type, account, params, method, url);
    }
}

async function signAndQueryBalance(type, account, params, method, url) {
    await API.init();
    try {
        getToken(account).then((res) => {
            fetch(url, {
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
            }).then((response) => {
                if (response.status === 200) {
                    response
                        .json()
                        .then((res) => {
                            return swal.fire({
                                title: `${type} Balance`,
                                text: res.result,
                                allowOutsideClick: false,
                                icon: "info",
                                confirmButtonText: "Okay",
                            });
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                } else if (response.status === 403) {
                    gatewayAccessError();
                } else {
                    transactionErrorHandler(response.status);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

export { signAndQueryBalance, balanceHandler };
