const AVN_API = require("avn-api");
const API = new AVN_API();
const axios = require("axios");

async function jsonRpcRequest(awtToken, url, suffix, method, params, purpose) {
    console.log(purpose);
    const full_url = `${url}${suffix}`;
    const response = await axios(full_url, {
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
