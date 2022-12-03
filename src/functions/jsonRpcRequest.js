const axios = require("axios");

async function jsonRpcRequest(awtToken, url, suffix, method, params, purpose) {
    console.log(purpose);
    const fullUrl = `${url}${suffix}`;
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
    console.log(response.data);
    console.log(response.data.result);
    return response.data.result;
}

export { jsonRpcRequest };
