import React, { useContext } from "react";
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
                    className="desktop-ext"
                    id="connection"
                    defaultChecked
                />
                {networkName ? (
                    <label
                        htmlFor="connection"
                        className="radio-text"
                        style={{ marginLeft: "5px" }}
                    >
                        {" "}
                        Connected Ethereum account (on {networkName}):
                    </label>
                ) : (
                    <span style={{ color: "red" }}>Unsupported Network</span>
                )}
            </p>
            <span id="account">{account}</span>
            &nbsp;
            <button className="gear-button desktop-ext buttonAnime">
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
