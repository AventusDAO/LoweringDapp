import { gatewayAccessError, transactionErrorHandler } from "./errorHandlers";
const axios = require("axios");

async function jsonRpcRequest(awtToken, url, suffix, method, params, purpose) {
    const fullUrl = `${url}${suffix}`;
    try {
        const response = await axios(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${awtToken}`,
            },
            data: {
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: 1,
            },
        });
        if (response.status === 200) {
            return response.data.result;
        } else {
            transactionErrorHandler(response.status);
            return null;
        }
    } catch (err) {
        if (err.response.status === 403) {
            gatewayAccessError();
            return null;
        }
    }
}

export { jsonRpcRequest };
