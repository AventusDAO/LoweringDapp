import { connectMetamaskButton } from "../../utils/ethereumFunctions/randomEthFunctions";
import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { networkErrorHandler } from "../../utils/errorHandlers";

export const NotConnected = () => {
    const { freezeDapp } = useContext(stateContext);
    return (
        <div className="metamask-button">
            <button
                type="button"
                className="btn connect-button rounded-0"
                onClick={() => {
                    freezeDapp
                        ? networkErrorHandler(
                              "Please set your Ethereum wallet to Ethereum MAINNET or GOERLI"
                          )
                        : connectMetamaskButton();
                }}
            >
                Connect to Metamask
            </button>
        </div>
    );
};
