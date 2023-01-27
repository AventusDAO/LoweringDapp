import React, { useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import { connectSpecificWallet } from "../../utils/polkadotFunctions/walletFunctions";
import { WalletAccounts } from "./WalletAccounts";

function MobileModalExtensions() {
    const { setPolkAccounts, polkAccounts, sender, setSender, setWalletName } =
        useContext(stateContext);

    useEffect(() => {}, [setSender]);

    const wallets = ["polkadot-js"];

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
                                className="btn card card-modal"
                                style={{
                                    borderRadius: "15px",
                                    backgroundColor: "white",
                                }}
                                onClick={() => {
                                    connectSpecificWallet(wallet).then(
                                        (accounts) => {
                                            setWalletName(wallet);
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
                                            <b>Nova</b>
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
            <WalletAccounts />
        </div>
    );
}

export { MobileModalExtensions };
