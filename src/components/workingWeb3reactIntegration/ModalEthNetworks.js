import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { metamaskMissingErrorHandler } from "../../functions/errorHandlers";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

//TODO will re-evaluate usefulness

const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 5],
});

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 5],
});

function ModalEthNetworks() {
    const { activate } = useWeb3React();

    const eth_wallets = [
        {
            name: "Coinbase Wallet",
            connector: CoinbaseWallet,
            key: 0,
        },
        {
            name: "Wallet Connect",
            connector: WalletConnect,
            key: 1,
        },
        {
            name: "Injected",
            connector: Injected,
            key: 2,
        },
    ];

    async function connect(connector_name, wallet) {
        try {
            await activate(wallet);
            localStorage.setItem("isEthWalletConnected", true);
            localStorage.setItem("connector", connector_name);
        } catch (err) {
            metamaskMissingErrorHandler();
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (
                localStorage?.getItem("isEthWalletConnected") === "true" &&
                localStorage?.getItem("connector")
            ) {
                try {
                    const eth_connector = localStorage?.getItem("connector");
                    eth_wallets.map(async (wallet) => {
                        if (wallet.name === eth_connector) {
                            await connect(wallet.name, wallet.connector);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        };
        connectWalletOnPageLoad();
    }, []);

    return (
        <div
            className="modal fade"
            id="EthNetworksModal"
            data-bs-backdrop="static"
            tabIndex="-1"
            aria-labelledby="EthNetworksModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="EthNetworksModalLabel">
                            <b>Connect Ethereum Wallet</b>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div
                        className="modal-body align-self-center mx-auto"
                        style={{ margin: "25px", width: "50%" }}
                    >
                        <div className="row" data-bs-dismiss="modal">
                            <button
                                style={{
                                    borderRadius: "15px",
                                    margin: "3px",
                                }}
                                className="btn card-status"
                                onClick={() => {
                                    connect(Injected, Injected);
                                }}
                            >
                                Injected wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEthNetworks;
