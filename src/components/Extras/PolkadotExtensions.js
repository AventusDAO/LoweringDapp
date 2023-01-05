import React, { useCallback, useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import { web3Enable } from "@polkadot/extension-dapp";
import { connectSpecificWallet } from "../../utils/polkadotFunctions/walletFunctions";
import { ModalExtensions } from "./ModalExtensions";

function PolkadotExtensions() {
    const { sender, setSender } = useContext(stateContext);

    const checkIfAnAccountIsConnected = useCallback(async () => {
        const user = localStorage.getItem("user");
        const activeExtension = localStorage.getItem("activeExtension");

        if (user && sender === "") {
            try {
                await web3Enable("Aventus Governance Dapp");
                const accounts = await connectSpecificWallet(activeExtension);
                for (let i = 0; i < accounts.length; i++) {
                    if (accounts[i].address === user) {
                        setSender(accounts[i]);
                    }
                }
            } catch (err) {
                localStorage.clear("user");
                localStorage.clear("activeExtension");
            }
        }
    }, [sender, setSender]);

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

export { PolkadotExtensions };
