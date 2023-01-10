import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(endpoint)
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Could not fetch the Lower data, please try again!"
                    );
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, [endpoint]);

    return { data, isPending, error };
};

export default useFetch;
