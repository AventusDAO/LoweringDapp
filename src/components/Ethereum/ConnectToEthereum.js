import React, { useContext } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { stateContext } from "../../Contexts/Context";
import clipboardIcon from "../../assets/img/clipboard.svg";

export const ConnectToEthereum = ({ networkName }) => {
    const { account } = useContext(stateContext);

    return (
        <div className="small-line account-info">
            <p className="font-weight-bold">
                <input
                    type="radio"
                    name="connectionBtn"
                    id="connection"
                    defaultChecked
                />
                {networkName ? (
                    <label
                        htmlFor="connection"
                        className="radio-text"
                        style={{ marginLeft: "5px" }}
                    >
                        Account connected to {networkName}
                    </label>
                ) : (
                    <span style={{ color: "red" }}>Unsupported Network</span>
                )}
            </p>
            <span id="account">{addressSlicer(account, -34, 34)}</span>
            &nbsp;
            <button className="gear-button buttonAnime">
                <img
                    src={clipboardIcon}
                    alt=""
                    onClick={() => {
                        navigator.clipboard.writeText(account);
                    }}
                />
            </button>
        </div>
    );
};
