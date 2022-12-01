import React, { useContext, useState } from "react";
import { balanceHandler } from "../../functions/queryBalance";
import PolkadotPageHeader from "../PageHeaders/PolkadotPageHeader";
import TokenBalanceForm from "./BalanceForms/TokenBalanceForm";
import { stateContext } from "../../Contexts/Context";

/* Configures what's shown on the balance page of the dapp
    Has three buttons, with a toggle state to determine if a form linked to the second button is shown.
*/
function BalanceForm() {
    const { sender, AVN_GATEWAY_URL, POLK_AVT_CONTRACT_ADDRESS } =
        useContext(stateContext);
    const ETH_CONTRACT_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

    const avt_method = "getAvtBalance";
    const eth_method = "getTokenBalance";
    const [isShown, setIsShown] = useState(false);

    let title = "Token Balance";
    let description = "View the balance of your token on the AvN";

    return (
        <>
            {/* Inserts the Polkadot header to the page with the relevant title and description for this page */}
            <PolkadotPageHeader title={title} description={description} />
            <div className="container-fluid mt-4">
                <div className="row">
                    <main role="main" className="text-center">
                        <div className="content mr-auto ml-auto">
                            <div
                                className="container form-container"
                                style={{ minHeight: "100%" }}
                            >
                                <div
                                    className="row mx-auto align-self-center text-center tab-content justify-center"
                                    id="myTabContent"
                                >
                                    <div
                                        className="tab-pane py-3 fade active show"
                                        id="bal-non-token-tab-pane"
                                        role="tabpanel"
                                        aria-labelledby="bal-non-token-tab"
                                        tabIndex="0"
                                    >
                                        <button
                                            className="btn connect-button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsShown(false);
                                                balanceHandler(
                                                    "AVT",
                                                    sender,
                                                    avt_method,
                                                    AVN_GATEWAY_URL
                                                );
                                            }}
                                        >
                                            AVT
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn connect-button"
                                            type="button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsShown(!isShown);
                                            }}
                                        >
                                            TOKEN
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn connect-button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsShown(false);
                                                balanceHandler(
                                                    "ETH",
                                                    sender,
                                                    eth_method,
                                                    AVN_GATEWAY_URL,
                                                    ETH_CONTRACT_ADDRESS
                                                );
                                            }}
                                        >
                                            ETH
                                        </button>
                                    </div>
                                    {/* The token form appears if set to true */}
                                    {isShown ? <TokenBalanceForm /> : ""}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default BalanceForm;
