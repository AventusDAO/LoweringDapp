import { connectMetamaskButton } from "../../utils/ethereumFunctions/randomEthFunctions";
import React from "react";

export const NotConnected = () => {
    return (
        <div className="metamask-button">
            <div style={{ fontSize: "11px" }}>
                <br />
                <span className="text-muted">Not connected</span>
            </div>
            <button
                type="button"
                className="btn connect-button mobile-bigButton"
                onClick={() => {
                    connectMetamaskButton();
                }}
            >
                Connect to Metamask
            </button>
        </div>
    );
};
