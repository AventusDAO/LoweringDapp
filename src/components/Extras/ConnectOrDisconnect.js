import React, { useContext } from "react";
import { setStorageItems } from "../../utils/polkadotFunctions/walletFunctions";
import { stateContext } from "../../Contexts/Context";

export const ConnectOrDisconnect = ({ account }) => {
    const { setPolkAccounts, sender, setSender, walletName } =
        useContext(stateContext);
    function disconnectSubstrateWallet() {
        setSender("");
        setPolkAccounts("");
        localStorage.clear("user");
        localStorage.clear("activeExtension");
    }
    return (
        <div className="col" style={{ marginRight: "-15px" }}>
            {sender.address === account.address &&
            sender.source === account.source ? (
                <div className="text-end">
                    <button
                        className="btn disconnect-btn card-status"
                        data-bs-dismiss="modal"
                        onClick={disconnectSubstrateWallet}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div className="text-end">
                    <button
                        className="account-connect-button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setSender(account);
                            setStorageItems(account.address, walletName);
                        }}
                    >
                        Connect
                    </button>
                </div>
            )}
        </div>
    );
};
