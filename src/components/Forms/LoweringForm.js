import React, { useState } from "react";
import AvtLoweringForm from "./lowerForms/AvtLoweringForm";
import Erc20LoweringForm from "./lowerForms/Erc20LoweringForm";
import Erc777LoweringForm from "./lowerForms/Erc777LoweringForm";
import EthLoweringForm from "./lowerForms/EthLoweringForm";
import { formContext } from "../../Contexts/Context";
import PolkadotPageHeader from "../PageHeaders/PolkadotPageHeader";
import FormNav from "./FormNav";

function LoweringForm() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [t1Recipient, setT1Recipient] = useState("");
    const [lowerLoading, setLowerLoading] = useState("");

    const title = "Lower";
    const description = "Move funds from the AvN to Ethereum";
    const isValidPage = true;
    const tokenTabs = ["AVT", "ERC20", "ERC777", "ETH"];

    return (
        <>
            <PolkadotPageHeader
                title={title}
                description={description}
                isValidPage={isValidPage}
            />
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
                                <formContext.Provider
                                    value={{
                                        t1Recipient,
                                        setT1Recipient,
                                        amount,
                                        setAmount,
                                        tokenAddress,
                                        setTokenAddress,
                                        lowerLoading,
                                        setLowerLoading,
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-2">
                                            <FormNav tabs={tokenTabs} />
                                        </div>
                                        <div className="col">
                                            <div
                                                className="row text-center tab-content justify-center"
                                                style={{
                                                    color: "black",
                                                }}
                                                id="myTabContent"
                                            >
                                                <AvtLoweringForm />
                                                <Erc20LoweringForm />
                                                <Erc777LoweringForm />
                                                <EthLoweringForm />
                                            </div>
                                        </div>
                                    </div>
                                </formContext.Provider>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default LoweringForm;
