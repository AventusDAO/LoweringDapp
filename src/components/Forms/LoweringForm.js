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
    const [lowerLoading, setLowerLoading] = useState("");
    function clearValues() {
        setToken("");
        setAmount("");
        setT1Recipient("");
    }

    let title = "Lower";
    let description = "Lower Your Tokens on Aventus to Ethereum";
    const tokenTabs = ["AVT", "ERC20", "ERC777", "ETH"];

    return (
        <>
            <PolkadotPageHeader title={title} description={description} />
            <div
                className="container-fluid mt-4"
                style={{ marginBottom: "20%" }}
            >
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
                                    {tokenTabs.map((value, index) => (
                                        <li
                                            key={index}
                                            className="nav-item"
                                            role="presentation"
                                        >
                                            <button
                                                className={`nav-link 
                                                    ${
                                                        index === 0
                                                            ? "active"
                                                            : ""
                                                    }
                                                `}
                                                id={`${value}-tab`}
                                                data-bs-toggle="tab"
                                                data-bs-target={`#${value}-tab-pane`}
                                                type="button"
                                                role="tab"
                                                aria-controls={`${value}-tab-pane`}
                                                aria-selected="false"
                                                onFocus={() => clearValues()}
                                            >
                                                {value}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className="row text-center tab-content justify-center"
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
                                            lowerLoading,
                                            setLowerLoading,
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
