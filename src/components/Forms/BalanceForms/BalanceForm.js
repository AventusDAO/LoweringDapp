import React, { useContext, useState } from "react";
import { balanceHandler } from "../../../utils/avnFunctions/queryBalance";
import PolkadotPageHeader from "../../PageHeaders/PolkadotPageHeader";
import TokenBalanceForm from "./TokenBalanceForm";
import { stateContext, queryBalanceContext } from "../../../Contexts/Context";
import { Spinner } from "../../Extras/Tools";

/* Configures what's shown on the balance page of the dapp
    Has three buttons, with a toggle state to determine if a form linked to the second button is shown.
*/
function BalanceForm() {
    const { sender, AVN_GATEWAY_URL } = useContext(stateContext);
    const ETH_CONTRACT_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

    const avtMethod = "getAvtBalance";
    const ethMethod = "getTokenBalance";
    const [isShown, setIsShown] = useState(false);
    const [avtQueryLoading, setAvtQueryLoading] = useState("");
    const [ethQueryLoading, setEthQueryLoading] = useState("");
    const [ercQueryLoading, setErcQueryLoading] = useState("");

    let title = "Token Balance";
    let description = "View the balance of your token on the Aventus Network";

    return (
        <>
            {/* Inserts the Polkadot header to the page with the relevant title and description for this page */}
            <PolkadotPageHeader title={title} description={description} />
            <div
                className="container-fluid mt-4"
                style={{ marginBottom: "20%", color: "black" }}
            >
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
                                        className="tab-pane py-3 fade active show mx-auto"
                                        id="bal-non-token-tab-pane"
                                        role="tabpanel"
                                        aria-labelledby="bal-non-token-tab"
                                        tabIndex="0"
                                    >
                                        <button
                                            className="btn connect-button custom-balance-tab-width"
                                            disabled={
                                                avtQueryLoading ||
                                                ethQueryLoading ||
                                                ercQueryLoading
                                            }
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsShown(false);
                                                setAvtQueryLoading(true);
                                                balanceHandler(
                                                    "AVT",
                                                    sender,
                                                    avtMethod,
                                                    AVN_GATEWAY_URL
                                                ).then(() => {
                                                    setAvtQueryLoading(false);
                                                });
                                            }}
                                        >
                                            {avtQueryLoading ? (
                                                <Spinner />
                                            ) : (
                                                "AVT"
                                            )}
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn connect-button custom-balance-tab-width"
                                            disabled={
                                                avtQueryLoading ||
                                                ethQueryLoading ||
                                                ercQueryLoading
                                            }
                                            type="button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsShown(!isShown);
                                            }}
                                        >
                                            {ercQueryLoading ? (
                                                <Spinner />
                                            ) : (
                                                "TOKEN"
                                            )}
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn connect-button custom-balance-tab-width"
                                            disabled={
                                                avtQueryLoading ||
                                                ethQueryLoading ||
                                                ercQueryLoading
                                            }
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setEthQueryLoading(true);
                                                setIsShown(false);
                                                balanceHandler(
                                                    "ETH",
                                                    sender,
                                                    ethMethod,
                                                    AVN_GATEWAY_URL,
                                                    ETH_CONTRACT_ADDRESS
                                                ).then(() =>
                                                    setEthQueryLoading(false)
                                                );
                                            }}
                                        >
                                            {ethQueryLoading ? (
                                                <Spinner />
                                            ) : (
                                                "ETH"
                                            )}
                                        </button>
                                        {isShown ? (
                                            ""
                                        ) : (
                                            <div style={{ fontSize: "13px" }}>
                                                <br />
                                                Note: Your wallet may prompt to approve the balance query operation
                                            </div>
                                        )}
                                    </div>
                                    {/* The token form appears if set to true */}
                                    <queryBalanceContext.Provider
                                        value={{
                                            ercQueryLoading,
                                            setErcQueryLoading,
                                        }}
                                    >
                                        {isShown ? <TokenBalanceForm /> : ""}
                                    </queryBalanceContext.Provider>
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
