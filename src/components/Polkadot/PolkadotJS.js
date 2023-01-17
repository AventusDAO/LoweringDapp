import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { addressSlicer } from "../../utils/randomFunctions";
import { PolkadotExtensions } from "../Extras/PolkadotExtensions";
import clipboardIcon from "../../assets/img/clipboard.svg";

function PolkadotJS() {
    const { sender } = useContext(stateContext);

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
                            {" "}
                            Connected Polkadot Account Address
                        </label>
                    </p>
                    <div>
                        <span id="account">
                            {addressSlicer(sender.address, -40, 40)}
                        </span>
                        &nbsp;
                        <button className="gear-button buttonAnime">
                            <img
                                src={clipboardIcon}
                                alt=""
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        sender.address
                                    );
                                }}
                            />
                        </button>
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
                    <PolkadotExtensions />
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
                <PolkadotExtensions />
            </div>
        );
    }
}

export { PolkadotJS };
