import { connectMetamaskButton } from "../../utils/ethereumFunctions/randomEthFunctions";
import React from "react";

export const NotConnected = () => {
    return (
        <div className="metamask-button">
            <button
                type="button"
                className="btn connect-button rounded-0"
                onClick={() => {
                    connectMetamaskButton();
                }}
            >
                Connect to Metamask
            </button>
        </div>
    );
};
