import React, { useContext } from "react";
import { formContext, stateContext } from "../../../Contexts/Context";
import { ercLowerSubmitHandler } from "../../../utils/avnFunctions/ercLowerSubmitHandler";
import { confirmLowerDetails } from "../../../utils/lowerUIchecks";
import { Spinner } from "../../Extras/Tools";

export default function Erc777LoweringForm() {
    const {
        token,
        setToken,
        amount,
        setAmount,
        t1Recipient,
        setT1Recipient,
        lowerLoading,
        setLowerLoading,
    } = useContext(formContext);
    const {
        sender,
        account,
        AVN_GATEWAY_URL,
        AVN_RELAYER,
        networkId,
        networkState,
    } = useContext(stateContext);
    const isERC777 = true;
    const isERC20 = false;

    function submitTxRequest() {
        setLowerLoading(true);
        confirmLowerDetails(sender.address, "ERC777", token, amount).then(
            (result) => {
                if (result)
                    ercLowerSubmitHandler(
                        sender,
                        account,
                        token,
                        amount,
                        t1Recipient,
                        AVN_GATEWAY_URL,
                        AVN_RELAYER,
                        networkId,
                        networkState,
                        isERC20,
                        isERC777
                    ).then(() => setLowerLoading(false));
                else {
                    setLowerLoading(false);
                }
            }
        );
    }

    return (
        <div
            className="tab-pane py-3 fade custom-lower-tab-width"
            id="ERC777-tab-pane"
            role="tabpanel"
            aria-labelledby="ERC777-tab"
            tabIndex="0"
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitTxRequest();
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
                <div className="row mb-3">
                    <label
                        htmlFor="tokenAmount"
                        className="col-sm-2 col-form-label"
                    >
                        Amount
                    </label>
                    <div className="col-sm-10">
                        <input
                            size="83"
                            type="text"
                            min={0}
                            required
                            pattern="^[0-9]\d*(\.\d+)?$"
                            maxLength={20}
                            className="form-control"
                            placeholder="whole or fractional tokens (eg: 100 or 1.0523)"
                            id="tokenAmount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label
                        htmlFor="t1Recipient"
                        className="col-sm-2 col-form-label"
                    >
                        Recipient
                    </label>
                    <div className="col-sm-10">
                        <input
                            size="83"
                            type="text"
                            required
                            className="form-control"
                            placeholder="Ethereum recipient address (eg: 0x405df1b38510c455ef81500a3dc7e9ae599e18f6)"
                            id="t1Recipient"
                            pattern="0x[0-9a-fA-F]{40}"
                            maxLength="42"
                            minLength="42"
                            value={t1Recipient}
                            onChange={(e) => setT1Recipient(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={lowerLoading}
                    className="btn lift-button rounded-0"
                    style={{ fontWeight: "bold" }}
                >
                    {lowerLoading ? <Spinner /> : "Approve and Lower"}
                </button>
                <div style={{ fontSize: "13px" }}>
                    <br />
                    Note: Your wallet will prompt you a few times to sign and
                    approve the multiple operations required to execute this
                    transaction.
                </div>
            </form>
        </div>
    );
}
