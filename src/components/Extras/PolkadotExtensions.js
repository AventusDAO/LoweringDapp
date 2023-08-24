import React, { useCallback, useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import { web3Enable } from "@polkadot/extension-dapp";
import { connectSpecificWallet } from "../../utils/polkadotFunctions/walletFunctions";
import { ModalExtensions } from "./ModalExtensions";
import { MobileModalExtensions } from "./MobileModalExtensions";

export function PolkadotExtensions() {
    const { aventusUser, setAventusUser } = useContext(stateContext);

    const checkIfAnAccountIsConnected = useCallback(async () => {
        const storedUser = localStorage.getItem("user");
        const activeExtension = localStorage.getItem("activeExtension");

        if (storedUser && aventusUser === "") {
            try {
                await web3Enable("Aventus Staking Dapp");
                const accounts = await connectSpecificWallet(activeExtension);
                for (let i = 0; i < accounts.length; i++) {
                    if (accounts[i].address === storedUser) {
                        setAventusUser(accounts[i]);
                    }
                }
            } catch (err) {
                localStorage.clear("user");
                localStorage.clear("activeExtension");
            }
        }
    }, [aventusUser, setAventusUser]);

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
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: "#F2F1F1",
                        color: "black",
                    }}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="extensionsModalLabel">
                            <b>Select Account</b>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            style={{
                                backgroundColor: "",
                            }}
                        ></button>
                    </div>
                    <div
                        className="modal-body desktop-ext"
                        style={{ margin: "25px" }}
                    >
                        <ModalExtensions />
                    </div>
                    <div
                        className="modal-body mobile-ext"
                        style={{ margin: "25px" }}
                    >
                        <MobileModalExtensions />
                    </div>
                </div>
            </div>
        </div>
    );
}
