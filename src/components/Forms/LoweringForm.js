import React, { useState } from "react";
import AvtLoweringForm from "./lowerForms/AvtLoweringForm";
import Erc20LoweringForm from "./lowerForms/Erc20LoweringForm";
import Erc777LoweringForm from "./lowerForms/Erc777LoweringForm";
import EthLoweringForm from "./lowerForms/EthLoweringForm";
import { formContext } from "../../Contexts/Context";
import PolkadotPageHeader from "../PageHeaders/PolkadotPageHeader";

function LoweringForm() {
    const [token, setToken] = useState("");
    const [amount, setAmount] = useState("");
    const [t1Recipient, setT1Recipient] = useState("");

    function clearValues() {
        setToken("");
        setAmount("");
        setT1Recipient("");
    }

    let title = "Lower";
    let description = "Lower Your Tokens on Aventus to Ethereum";

    return (
        <>
            <PolkadotPageHeader title={title} description={description} />
            <div className="container-fluid mt-4">
                <div className="row">
                    <main role="main" className="text-center">
                        <div className="content mr-auto ml-auto">
                            <div
                                className="container form-container"
                                style={{ minHeight: "100%" }}
                            >
                                <ul
                                    className="nav nav-tabs justify-content-center form-headers"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
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
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
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
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <button
                                            className="nav-link"
                                            id="erc777-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#erc777-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="erc777-tab-pane"
                                            aria-selected="false"
                                            onFocus={() => clearValues()}
                                        >
                                            ERC777
                                        </button>
                                    </li>
                                    <li
                                        className="nav-item"
                                        role="presentation"
                                    >
                                        <button
                                            className="nav-link"
                                            id="eth-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#eth-tab-pane"
                                            type="button"
                                            role="tab"
                                            aria-controls="eth-tab-pane"
                                            aria-selected="false"
                                            onFocus={() => clearValues()}
                                        >
                                            ETH
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
                                        <Erc777LoweringForm />
                                        <EthLoweringForm />
                                    </formContext.Provider>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default LoweringForm;
