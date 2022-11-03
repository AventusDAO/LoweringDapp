import React, { useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import Networks from "../../config/Networks.json";
import { addressSlicer } from "../../functions/randomFunctions";
import { WalletExtensions } from "../Extras/ModalExtensions";

function PolkadotJS() {
    const {
        sender,
        network_state,
        setAVN_RELAYER,
        setAVN_GATEWAY_URL,
        setPOLK_AVT_CONTRACT_ADDRESS,
    } = useContext(stateContext);

    useEffect(() => {
        setAVN_GATEWAY_URL(Networks.avn_networks[network_state].gateway);
        setAVN_RELAYER(Networks.avn_networks[network_state].relayer);
        setPOLK_AVT_CONTRACT_ADDRESS(
            Networks.avn_networks[network_state].avt_contract_address
        );
    }, [
        network_state,
        setAVN_GATEWAY_URL,
        setAVN_RELAYER,
        setPOLK_AVT_CONTRACT_ADDRESS,
    ]);

    if (sender) {
        return (
            <div>
                <div className="small-line account-info">
                    <p className="font-weight-bold">
                        <input
                            type="radio"
                            name="connectionBtn"
                            id="connection"
                            defaultChecked
                        />
                        <label htmlFor="connection">
                            Connected Polkadot Account Address
                        </label>
                    </p>
                    <div>
                        <span id="account">
                            {addressSlicer(sender.address, -40, 40)}
                        </span>
                    </div>
                </div>
                <div
                    className="flex align-self-center justify-center"
                    style={{ marginTop: "15px" }}
                >
                    <button
                        type="button"
                        className="btn connect-button rounded-0"
                        data-bs-toggle="modal"
                        data-bs-target="#extensionsModal"
                    >
                        Switch to Another Account
                    </button>
                    <WalletExtensions />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex align-self-center justify-center">
                <button
                    type="button"
                    className="btn connect-button rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#extensionsModal"
                >
                    Connect Your Polkadot Wallet
                </button>
                <WalletExtensions />
            </div>
        );
    }
}

export default PolkadotJS;
