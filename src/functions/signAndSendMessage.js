import tryGetAvnAccountAddress from "./polkaKey";
import generateAwtPayload from "./generateAwt";
import AVN_API from "avn-api";
import swal from "sweetalert2";

import { transactionErrorHandler, gatewayAccessError } from "./errorHandlers";

const API = new AVN_API();

async function getToken(account) {
    await API.init();
    const signer = account.signer;
    const pKey = tryGetAvnAccountAddress(account.address);
    const issuedAt = Date.now();
    const payload = await generateAwtPayload(
        signer,
        account.address,
        pKey,
        issuedAt
    );

    const awtToken = API.awt.generateAwtTokenFromPayload(payload);
    return awtToken;
}

async function signAndSendMessage(account, params, method, url) {
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
                                title: "Token Balance",
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

export { getToken, signAndSendMessage };
