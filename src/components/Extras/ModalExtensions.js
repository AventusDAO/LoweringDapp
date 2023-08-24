import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { capitaliseFirstLetter } from "../../utils/randomFunctions";
import { connectSpecificWallet } from "../../utils/polkadotFunctions/walletFunctions";
import { WalletAccounts } from "./WalletAccounts";
import GenerateNewToken from "./GenerateNewToken";

function ModalExtensions() {
    const {
        setSubstrateAccounts,
        substrateAccounts,
        aventusUser,
        setWalletName,
    } = useContext(stateContext);

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
                                className="btn card card-modal"
                                style={{
                                    borderRadius: "15px",
                                    backgroundColor: "white",
                                }}
                                onClick={() => {
                                    connectSpecificWallet(wallet).then(
                                        (accounts) => {
                                            setWalletName(wallet);
                                            setSubstrateAccounts(accounts);
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
                                        {aventusUser &&
                                            wallet === aventusUser.source && (
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
                {aventusUser && <GenerateNewToken />}
                <b>Accounts: </b>{" "}
                {!substrateAccounts && "Select from the above extensions."}{" "}
            </div>
            <WalletAccounts />
        </div>
    );
}

export { ModalExtensions };
