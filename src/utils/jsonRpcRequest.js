import {
    gatewayAccessError,
    genericErrorHandlerTemplate,
    transactionErrorHandler,
} from "./errorHandlers";

const axios = require("axios");

export async function jsonRpcRequest({
    awtToken,
    aventusUser,
    hasPayer,
    url,
    suffix,
    method,
    params,
}) {
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
            gatewayAccessError(aventusUser, hasPayer);
            return null;
        } else {
            genericErrorHandlerTemplate(
                `Error Occurred ${err.response.status}`,
                "Please try again after 10 minutes. If the problem persists contact the Aventus team."
            );
            return null;
        }
    }
}
