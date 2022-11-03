import React, { useState } from "react";
import AvtLoweringForm from "./AvtLoweringForm";
import Erc20LoweringForm from "./Erc20LoweringForm";
import BalanceForm from "./BalanceForm";
import { formContext } from "../../Contexts/Context";

function LoweringForm() {
    const [token, setToken] = useState("");
    const [amount, setAmount] = useState("");
    const [t1Recipient, setT1Recipient] = useState("");

    function clearValues() {
        setToken("");
        setAmount("");
        setT1Recipient("");
    }

    return (
        <div className="container form-container" style={{ minHeight: "100%" }}>
            <ul
                className="nav nav-tabs justify-content-center form-headers"
                id="myTab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="non-avt-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#avt-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="avt-tab-pane"
                        aria-selected="true"
                        onFocus={() => clearValues()}
                    >
                        AVT
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="non-avt-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#non-avt-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="non-avt-tab-pane"
                        aria-selected="false"
                        onFocus={() => clearValues()}
                    >
                        ERC20
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="balance-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#balance-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="balance-tab-pane"
                        aria-selected="false"
                        onFocus={() => clearValues()}
                    >
                        BALANCE
                    </button>
                </li>
            </ul>
            <div
                className="row mx-auto align-self-center text-center tab-content justify-center"
                id="myTabContent"
            >
                <formContext.Provider
                    value={{
                        t1Recipient,
                        setT1Recipient,
                        amount,
                        setAmount,
                        token,
                        setToken,
                    }}
                >
                    <AvtLoweringForm />
                    <Erc20LoweringForm />
                    <BalanceForm />
                </formContext.Provider>
            </div>
        </div>
    );
}

export default LoweringForm;
