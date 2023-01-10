import { useCallback, useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import Networks from "../../config/Networks.json";
// import { LightDarkMode } from "../Theme/LightDarkMode";

const NetworkDropdownNames = [
    { MAINNET: "AvN Mainnet" },
    { PUBLIC_TESTNET: "AvN Public Testnet" },
    { DEV: "AvN Development" },
];

// TODO Turn On Dark Mode

export const NetworkDropdown = () => {
    const {
        networkState,
        setNetworkState,
        setTestnetState,
        testnetState,
        setAVN_RELAYER,
        setAVN_GATEWAY_URL,
        setPOLK_AVT_CONTRACT_ADDRESS,
        freezeDapp,
        networkId,
    } = useContext(stateContext);

    const changeNetworks = useCallback(async () => {
        const chainId = networkState === "MAINNET" ? "0x1" : "0x5";
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId }],
            });
        } catch (err) {
            if (err.code === 4001) {
                if (networkState === "MAINNET") {
                    setNetworkState(testnetState);
                } else {
                    setNetworkState("MAINNET");
                }
            }
            return null;
        }

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
            if (networkId === 5) {
                promptNetworkChange("PUBLIC_TESTNET");
            } else if (networkId === 1) {
                promptNetworkChange("MAINNET");
            }
        }
    }, [
        networkState,
        testnetState,
        networkId,
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
                {freezeDapp ? (
                    <div style={{ color: "red" }}>
                        Unsupported Ethereum Network
                    </div>
                ) : (
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
                )}
            </div>
        </>
    );
};
