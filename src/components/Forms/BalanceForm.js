import React, { useContext } from "react";
import { formContext, stateContext } from "../../Contexts/Context";
// import { queryBalanceHandler } from "../../functions/submitHandlers";
import { queryHandler } from "../../functions/queryHandler";

function BalanceForm() {
    const { token, setToken } = useContext(formContext);
    const { sender, AVN_GATEWAY_URL } = useContext(stateContext);
    const method = "getTokenBalance";

    return (
        <div
            className="tab-pane py-3 fade"
            id="balance-tab-pane"
            role="tabpanel"
            aria-labelledby="balance-tab"
            tabIndex="0"
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    queryHandler(sender, token, method, AVN_GATEWAY_URL);
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
                    style={{ fontWeight: "bold" }}
                >
                    Sign and Query Balance
                </button>
                <div style={{ fontSize: "13px" }}>
                    <br />
                    Note: Your wallet will prompt you once to sign and approve
                    the query operation required to query your balance.
                </div>
            </form>
        </div>
    );
}

export default BalanceForm;
