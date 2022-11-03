import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { capitaliseFirstLetter } from "../../functions/randomFunctions";
import { substrateNotDetected } from "../../functions/errorHandlers";
import { addressSlicer } from "../../functions/randomFunctions";

async function connectSpecificWallet(name, setPolkAccounts) {
    try {
        const specific_extension = window.injectedWeb3[name];
        const extension = await specific_extension.enable();
        const accounts = await extension.accounts.get();
        const signRaw = await extension?.signer?.signRaw;
        localStorage.setItem("polkadotWalletConnected", true);
        accounts.forEach((account) => {
            account.signer = signRaw;
            account.source = name;
        });
        // setAllAccounts
        return accounts;
    } catch (err) {
        substrateNotDetected(name);
    }
}

function WalletExtensions() {
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
                                className="btn card"
                                style={{ borderRadius: "15px" }}
                                onClick={() => {
                                    setSender(account);
                                    localStorage.setItem("sender", sender);
                                }}
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
                                            sender.source ===
                                                account.source && (
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
    );
}

export { WalletExtensions, ModalExtensions, connectSpecificWallet };
