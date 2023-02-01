import { useCallback, useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import Networks from "../../config/Networks.json";

const NetworkDropdownNames = [
    { MAINNET: "AvN Mainnet" },
    { PUBLIC_TESTNET: "AvN Testnet" },
    { DEV: "AvN Development" },
];

// TODO Turn On Dark Mode

export const NetworkDropdown = () => {
    const {
        networkState,
        setNetworkState,
        setTestnetState,
        setAVN_GATEWAY_URL,
        setPOLK_AVT_CONTRACT_ADDRESS,
        setAVN_RELAYER,
    } = useContext(stateContext);

    const changeNetworks = useCallback(async () => {
        function promptNetworkChange(network) {
            setAVN_GATEWAY_URL(Networks.AVN_NETWORKS[network].GATEWAY);
            setAVN_RELAYER(Networks.AVN_NETWORKS[network].RELAYER);
            setPOLK_AVT_CONTRACT_ADDRESS(
                Networks.AVN_NETWORKS[network].AVT_CONTRACT_ADDRESS
            );
            setNetworkState(network);
        }

        try {
            promptNetworkChange(networkState);
        } catch (err) {
            console.log(err.message);
        }
    }, [
        networkState,
        setAVN_GATEWAY_URL,
        setPOLK_AVT_CONTRACT_ADDRESS,
        setAVN_RELAYER,
        setNetworkState,
    ]);

    useEffect(() => {
        changeNetworks();
    }, [changeNetworks]);

    return (
        <>
            <div className="select-button text-center align-self-center mx-auto">
                <select
                    className="form-select row"
                    aria-label="aventus test networks"
                    id="lang"
                    onChange={(e) => {
                        if (e.target.value !== "MAINNET") {
                            setTestnetState(e.target.value);
                        }
                        setNetworkState(e.target.value);
                    }}
                >
                    {NetworkDropdownNames.map(
                        (network, index) =>
                            Object.keys(network).toString() ===
                                networkState && (
                                <option
                                    defaultValue
                                    defaultChecked
                                    value={Object.keys(network)}
                                    key={index}
                                >
                                    {Object.values(network)}
                                </option>
                            )
                    )}
                    {NetworkDropdownNames.map(
                        (network, index) =>
                            Object.keys(network).toString() !==
                                networkState && (
                                <option
                                    value={Object.keys(network)}
                                    key={index}
                                >
                                    {Object.values(network)}
                                </option>
                            )
                    )}
                </select>
            </div>
        </>
    );
};
