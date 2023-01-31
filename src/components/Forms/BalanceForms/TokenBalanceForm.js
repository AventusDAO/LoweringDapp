import React, { useContext, useState } from "react";
import { queryBalanceContext, stateContext } from "../../../Contexts/Context";
import { balanceHandler } from "../../../utils/avnFunctions/queryBalance";

/*
    The token balance query requires the user to input the token address for which they would like to query
    It takes in the Ethereum address of the token.
*/
function TokenBalanceForm() {
    const [token, setToken] = useState("");
    const { sender, AVN_GATEWAY_URL } = useContext(stateContext);
    const method = "getTokenBalance";
    const { ercQueryLoading, setErcQueryLoading } =
        useContext(queryBalanceContext);

    return (
        <>
            <div
                className="tab-pane py-3 fade show active"
                id="bal-token-tab-pane"
                role="tabpanel"
                aria-labelledby="bal-token-tab"
                style={{ marginBottom: "20%" }}
                tabIndex="0"
            >
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setErcQueryLoading(true);
                        balanceHandler(
                            "Token",
                            sender,
                            method,
                            AVN_GATEWAY_URL,
                            token
                        ).then(() => setErcQueryLoading(false));
                    }}
                >
                    <div className="row mb-3">
                        <label
                            htmlFor="tokenAddress"
                            className="col-sm-2 col-form-label"
                        >
                            Token
                        </label>
                        <div className="col-sm-10">
                            <input
                                size="83"
                                type="text"
                                required
                                className="form-control"
                                placeholder="token contract address (eg: 0x46a1a476d02f4a79b7a38fa0863a954ae252251d)"
                                pattern="0x[0-9a-fA-F]{40}"
                                maxLength="42"
                                minLength="42"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                id="tokenAddress"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn lift-button rounded-0"
                        disabled={ercQueryLoading}
                        style={{ fontWeight: "bold" }}
                    >
                        Get Balance
                    </button>
                    <div style={{ fontSize: "13px" }}>
                        <br />
                        Note: Your wallet may prompt you once to sign and
                        approve the query operation required to query your
                        balance.
                    </div>
                </form>
            </div>
        </>
    );
}

export default TokenBalanceForm;
