const AVN_API = require("avn-api");
const API = new AVN_API();
const axios = require("axios");

async function jsonRpcRequest(awtToken, url, suffix, method, params, funct) {
    console.log("jsonRpcRequest");
    console.log(funct);
    console.log(awtToken, url, suffix, method, params);
    const full_url = `${url}${suffix}`;
    await API.init();
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

async function queryJsonRpcRequest(sender, url, method, params) {
    const awtToken = "await getToken(sender);";
    await API.init();
    const response = await axios(url, {
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
export { queryJsonRpcRequest, jsonRpcRequest };
