import {
    metamaskMissingErrorHandler,
    metamaskConnectionErrorHandler,
} from "../functions/errorHandlers";
import React, { useEffect, useContext } from "react";
import { stateContext } from "../Contexts/Context";
import { addressSlicer } from "../functions/randomFunctions";

const GOERLI_ID = 5;
const ETHEREUM_MAINNET_ID = 1;

async function connectMetamaskButton() {
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
        if (error.code === 4001) {
            metamaskConnectionErrorHandler();
        } else {
            metamaskMissingErrorHandler();
        }
    }
}

function Ethereum({ account, networkId }) {
    const { loadWeb3 } = useContext(stateContext);

    // check if the user has changed the network or account on metamask and reload the window.
    useEffect(() => {
        if (loadWeb3 && account !== "") {
            loadWeb3.currentProvider.on("chainChanged", () => {
                window.location.reload();
            });
            loadWeb3.currentProvider.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    if (account) {
        if (networkId === GOERLI_ID || networkId === ETHEREUM_MAINNET_ID) {
            const networkName =
                networkId === ETHEREUM_MAINNET_ID
                    ? "Ethereum Mainnet"
                    : "GOERLI Test Network";

            return (
                <div className="small-line account-info">
                    <p className="font-weight-bold">
                        <input
                            type="radio"
                            name="connectionBtn"
                            id="connection"
                            defaultChecked
                        />
                        <label
                            htmlFor="connection"
                            className="radio-text"
                            style={{ marginLeft: "5px" }}
                        >
                            {" "}
                            Account connected to {networkName}:{" "}
                        </label>
                    </p>
                    <span id="account">{addressSlicer(account, -34, 34)}</span>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return (
            <div className="metamask-button">
                <button
                    type="button"
                    className="btn connect-button rounded-0"
                    onClick={connectMetamaskButton}
                >
                    Connect to Metamask
                </button>
            </div>
        );
    }
}

export default Ethereum;
