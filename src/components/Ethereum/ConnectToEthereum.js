import React, { useContext } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { stateContext } from "../../Contexts/Context";

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
                <label
                    htmlFor="connection"
                    className="radio-text"
                    style={{ marginLeft: "5px" }}
                >
                    {" "}
                    Account connected to {networkName}{" "}
                </label>
            </p>
            <span id="account">{addressSlicer(account, -34, 34)}</span>
        </div>
    );
};
