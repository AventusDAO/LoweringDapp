import { getToken } from "../../functions/signAndSendMessage";
import { useState, useEffect } from "react";

const useFetchForGateway = (account, url, method, params) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getToken(account).then((res) => {
            fetch(url, {
                method: "post",
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
            })
                .then((response) => {
                    return response.json();
                })
                .then((g) => {
                    setData(g.result);
                })
                .catch((e) => {
                    console.error(e);
                });
        });
    }, [url]);
    return { data };
};

export default useFetchForGateway;
