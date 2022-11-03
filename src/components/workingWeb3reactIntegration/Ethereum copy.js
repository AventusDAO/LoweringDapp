import {
    metamaskMissingErrorHandler,
    metamaskConnectionErrorHandler,
} from "../../functions/errorHandlers";
import React, { useEffect, useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import ModalEthNetworks from "./ModalEthNetworks";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { addressSlicer } from "../../functions/randomFunctions";

const GOERLI_ID = 5;
const ETHEREUM_MAINNET_ID = 1;

function Ethereum() {
    const { m_account, networkId, loadWeb3, setNetworkId, setAccount } =
        useContext(stateContext);

    const {
        activate,
        deactivate,
        active,
        chainId,
        account,
        library,
        connector,
    } = useWeb3React();

    console.log(active, chainId);
    const networkName = chainId === 1 ? "ETHEREUM_MAINNET_ID" : "GOERLI_ID";
    console.log(window.web3);

    async function disconnect() {
        try {
            deactivate();
            localStorage.setItem("isWalletConnected", false);
            localStorage.setItem("connector", "");
        } catch (ex) {
            console.log(ex);
        }
    }

    function getLibrary(provider) {
        return new Web3(provider);
    }

    // check if the user has changed the network or account on metamask and reload the window.
    // useEffect(() => {
    //     if (loadWeb3 && m_account !== "") {
    //         loadWeb3.currentProvider.on("chainChanged", () => {
    //             window.location.reload();
    //         });
    //         loadWeb3.currentProvider.on("accountsChanged", () => {
    //             window.location.reload();
    //         });
    //     }
    // });

    return (
        <>
            {active ? (
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
                    <span id="account">{addressSlicer(account, -36, -6)}</span>
                    <br />
                    <button
                        className="btn connect-button rounded-0"
                        style={{ marginTop: "10px" }}
                        onClick={disconnect}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div className="metamask-button">
                    <button
                        type="button"
                        className="btn connect-button rounded-0"
                        style={{ fontWeight: "bold" }}
                        data-bs-toggle="modal"
                        data-bs-target="#EthNetworksModal"
                    >
                        Connect Ethereum Wallet
                    </button>
                    <ModalEthNetworks />
                </div>
            )}
        </>
    );
}

export default Ethereum;
