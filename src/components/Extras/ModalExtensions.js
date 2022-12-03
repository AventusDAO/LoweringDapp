import React, { useCallback, useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import { capitaliseFirstLetter } from "../../functions/randomFunctions";
import { substrateNotDetected } from "../../functions/errorHandlers";
import { addressSlicer } from "../../functions/randomFunctions";
import { web3Enable } from "@polkadot/extension-dapp";

async function connectSpecificWallet(name) {
    try {
        const specificExtension = window.injectedWeb3[name];
        const extension = await specificExtension.enable();
        const accounts = await extension.accounts.get();
        const signRaw = await extension?.signer?.signRaw;
        accounts.forEach((account) => {
            account.signer = signRaw;
            account.source = name;
        });
        return accounts;
    } catch (err) {
        substrateNotDetected(name);
    }
}

function WalletExtensions() {
    const { setSender } = useContext(stateContext);

    const checkIfAnAccountIsConnected = useCallback(async () => {
        const user = localStorage.getItem("user");
        const activeExtension = localStorage.getItem("activeExtension");

        if (user && activeExtension) {
            try {
                await web3Enable("Aventus Lowering Dapp");
                const accounts = await connectSpecificWallet(activeExtension);
                for (let i = 0; i < accounts.length; i++) {
                    if (accounts[i].address === user) {
                        setSender(accounts[i]);
                    }
                }
            } catch (err) {}
        }
    }, [setSender]);

    useEffect(() => {
        checkIfAnAccountIsConnected();
    }, [checkIfAnAccountIsConnected]);

    return (
        <div
            className="modal fade"
            id="extensionsModal"
            tabIndex="-1"
            data-bs-backdrop="static"
            aria-labelledby="extensionsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="extensionsModalLabel">
                            <b>Select Account</b>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body" style={{ margin: "25px" }}>
                        <ModalExtensions />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalExtensions() {
    const { setPolkAccounts, polkAccounts, sender, setSender } =
        useContext(stateContext);

    function disconnectSubstrateWallet() {
        setSender("");
        setPolkAccounts("");
        localStorage.clear();
    }

    useEffect(() => {}, [setSender]);

    const wallets = ["polkadot-js", "talisman", "subwallet-js"];

    return (
        <div>
            <div className="text-start" style={{ margin: "5px" }}>
                <b>Supported Wallets: </b>
            </div>
            <div className="row">
                {wallets.map((wallet) => (
                    <div key={wallet}>
                        <div className="row">
                            <div
                                className="btn card"
                                style={{ borderRadius: "15px" }}
                                onClick={() => {
                                    connectSpecificWallet(wallet).then(
                                        (accounts) => {
                                            localStorage.setItem(
                                                "activeExtension",
                                                wallet
                                            );
                                            setPolkAccounts(accounts);
                                        }
                                    );
                                }}
                            >
                                <div className="row">
                                    <div
                                        className="col text-start card-author"
                                        style={{ marginLeft: "-10px" }}
                                    >
                                        <span className="card-author">
                                            <b>
                                                {capitaliseFirstLetter(wallet)}
                                            </b>
                                        </span>
                                    </div>
                                    <div
                                        className="col"
                                        style={{ marginRight: "-15px" }}
                                    >
                                        {sender && wallet === sender.source && (
                                            <div className="text-end">
                                                <span className="card-status">
                                                    Active
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div className="text-start" style={{ margin: "5px" }}>
                <b>Accounts: </b>{" "}
                {!polkAccounts && "Select from the above extensions."}{" "}
            </div>
            {polkAccounts &&
                polkAccounts.map((account) => (
                    <div key={account.address} data-bs-dismiss="modal">
                        <div className="row">
                            <div
                                className="btn card-modal card"
                                style={{ borderRadius: "15px" }}
                            >
                                <div className="row">
                                    <div
                                        className="col"
                                        style={{ marginLeft: "-10px" }}
                                    >
                                        <div className="text-start">
                                            <span className="card-author">
                                                <b>
                                                    {capitaliseFirstLetter(
                                                        account.name
                                                    )}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="col"
                                        style={{ marginLeft: "-10px" }}
                                    >
                                        <div className="text-start">
                                            <span className="card-author">
                                                <b>
                                                    {addressSlicer(
                                                        account.address,
                                                        -44,
                                                        44
                                                    )}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="col"
                                        style={{ marginRight: "-15px" }}
                                    >
                                        {sender.address === account.address &&
                                        sender.source === account.source ? (
                                            <div className="text-end">
                                                <button
                                                    className="disconnect-btn card-status"
                                                    onClick={
                                                        disconnectSubstrateWallet
                                                    }
                                                >
                                                    Disconnect
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-end">
                                                <button
                                                    className="account-connect-button"
                                                    onClick={() => {
                                                        setSender(account);
                                                        localStorage.setItem(
                                                            "user",
                                                            account.address
                                                        );
                                                    }}
                                                >
                                                    Connect
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export { WalletExtensions, ModalExtensions, connectSpecificWallet };
