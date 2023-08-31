import { Spinner } from "../../Extras/Tools";
import { balanceHandler } from "../../../utils/avnFunctions/queryBalance";
import React, { useContext, useState } from "react";
import TokenBalanceForm from "./TokenBalanceForm";
import {
    stateContext,
    queryBalanceContext,
    balanceButtonContext,
} from "../../../Contexts/Context";

const BalanceButtons = () => {
    const { aventusUser, AVN_GATEWAY_URL } = useContext(stateContext);
    const { isShown, setIsShown } = useContext(balanceButtonContext);
    const ETH_CONTRACT_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const [ercQueryLoading, setErcQueryLoading] = useState("");

    const avtMethod = "getAvtBalance";
    const ethMethod = "getTokenBalance";
    const [avtQueryLoading, setAvtQueryLoading] = useState("");
    const [ethQueryLoading, setEthQueryLoading] = useState("");
    return (
        <div
            className="tab-pane py-3 fade active show mx-auto"
            id="bal-non-token-tab-pane"
            role="tabpanel"
            aria-labelledby="bal-non-token-tab"
            tabIndex="0"
        >
            <button
                className="btn submit-button custom-balance-tab-width"
                disabled={avtQueryLoading || ethQueryLoading || ercQueryLoading}
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    setIsShown(false);
                    setAvtQueryLoading(true);
                    balanceHandler({
                        tokenType: "AVT",
                        aventusUser,
                        method: avtMethod,
                        url: AVN_GATEWAY_URL,
                    }).then(() => {
                        setAvtQueryLoading(false);
                    });
                }}
            >
                {avtQueryLoading ? <Spinner /> : "AVT"}
            </button>
            &nbsp;
            <button
                className="btn submit-button custom-balance-tab-width"
                disabled={avtQueryLoading || ethQueryLoading || ercQueryLoading}
                type="button"
                onClick={(event) => {
                    event.preventDefault();
                    setIsShown(!isShown);
                }}
            >
                {ercQueryLoading ? <Spinner /> : "TOKEN"}
            </button>
            &nbsp;
            <button
                className="btn submit-button custom-balance-tab-width"
                disabled={avtQueryLoading || ethQueryLoading || ercQueryLoading}
                onClick={(event) => {
                    event.preventDefault();
                    setEthQueryLoading(true);
                    setIsShown(false);
                    balanceHandler({
                        tokenType: "ETH",
                        aventusUser,
                        method: ethMethod,
                        url: AVN_GATEWAY_URL,
                        tokenAddress: ETH_CONTRACT_ADDRESS,
                    }).then(() => setEthQueryLoading(false));
                }}
            >
                {ethQueryLoading ? <Spinner /> : "ETH"}
            </button>
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
    );
};

export default BalanceButtons;
