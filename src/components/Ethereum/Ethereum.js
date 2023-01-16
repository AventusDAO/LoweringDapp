import React, { useEffect, useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { NotConnected } from "./NotConnected";
import { ConnectToEthereum } from "./ConnectToEthereum";

const GOERLI_ID = 5;
const ETHEREUM_MAINNET_ID = 1;

function Ethereum() {
    const {
        loadWeb3,
        account,
        networkId,
        setAccount,
        setNetworkId,
        freezeDapp,
        setFreezeDapp,
    } = useContext(stateContext);

    // check if the user has changed the network or account on metamask and reload the window.
    useEffect(() => {
        if (loadWeb3 && account !== "") {
            loadWeb3.currentProvider.on("chainChanged", () => {
                loadWeb3.eth.net.getId().then(setNetworkId);
            });
            loadWeb3.currentProvider.on("accountsChanged", () => {
                loadWeb3.eth.getAccounts().then(setAccount);
            });
            loadWeb3.eth.net.getId().then((id) => {
                if (id === GOERLI_ID || id === ETHEREUM_MAINNET_ID) {
                    setFreezeDapp(false);
                }
            });
        }
    }, [
        account,
        setFreezeDapp,
        freezeDapp,
        setNetworkId,
        loadWeb3,
        setAccount,
    ]);

    if (account) {
        if (freezeDapp) {
            return (
                <div style={{ color: "red" }}>
                    Unsupported Ethereum Network. <br />
                    Please use Ethereum Goerli or Mainnet.{" "}
                </div>
            );
        } else {
            let networkName;
            if (networkId === ETHEREUM_MAINNET_ID) {
                networkName = "Ethereum Mainnet";
            } else if (networkId === GOERLI_ID) {
                networkName = "GOERLI Test Network";
            }
            return <ConnectToEthereum networkName={networkName} />;
        }
    } else {
        return <NotConnected />;
    }
}

export default Ethereum;
