import React, { useContext } from "react";
import { setStorageItems } from "../../utils/polkadotFunctions/walletFunctions";
import { stateContext } from "../../Contexts/Context";

// Allows a user connect or disconnect an account from an available crypto wallet.

export function ConnectOrDisconnectAddressInCryptoWallet({ account }) {
    const { aventusUser } = useContext(stateContext);
    return (
        <div className="col" style={{ marginRight: "-15px" }}>
            {aventusUser.address === account.address &&
            aventusUser.source === account.source ? (
                <Disconnect />
            ) : (
                <Connect account={account} />
            )}
        </div>
    );
}

export function Disconnect() {
    const { setSubstrateAccounts, setAventusUser } = useContext(stateContext);

    function disconnectSubstrateWallet() {
        setAventusUser("");
        setSubstrateAccounts("");
        localStorage.clear("user");
        localStorage.clear("activeExtension");
    }
    return (
        <div className="text-end">
            <button
                className="btn disconnect-btn card-status"
                data-bs-dismiss="modal"
                onClick={disconnectSubstrateWallet}
            >
                Disconnect
            </button>
        </div>
    );
}

export function Connect({ account }) {
    const { setAventusUser, walletName } = useContext(stateContext);
    return (
        <div className="text-end">
            <button
                className="account-connect-button"
                data-bs-dismiss="modal"
                onClick={() => {
                    setAventusUser(account);
                    setStorageItems(account.address, walletName);
                }}
            >
                Connect
            </button>
        </div>
    );
}
