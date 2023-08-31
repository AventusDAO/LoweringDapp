import React, { useContext } from "react";
import { formContext, stateContext } from "../../../Contexts/Context";
import { lowerSubmitHandler } from "../../../utils/avnFunctions/lowerSubmitHandler";
import { confirmLowerDetails } from "../../../utils/lowerUIchecks";
import { Spinner } from "../../Extras/Tools";

const tokenType = "AVT";

export default function AvtLoweringForm() {
    const {
        amount,
        setAmount,
        t1Recipient,
        setT1Recipient,
        lowerLoading,
        setLowerLoading,
    } = useContext(formContext);

    const {
        aventusUser,
        AVN_GATEWAY_URL,
        AVN_RELAYER,
        EXPLORER_TX_URL,
        POLK_AVT_CONTRACT_ADDRESS,
        networkState,
    } = useContext(stateContext);

    const networkId = networkState === "MAINNET" ? 1 : 5;

    return (
        <div
            className="tab-pane py-3 fade show active custom-lower-tab-width"
            id="AVT-tab-pane"
            role="tabpanel"
            aria-labelledby="AVT-tab"
            tabIndex="0"
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setLowerLoading(true);
                    confirmLowerDetails({
                        aventusUserAddress: aventusUser.address,
                        tokenType,
                        tokenAddress: POLK_AVT_CONTRACT_ADDRESS,
                        amount,
                        t1Recipient,
                        networkId,
                    }).then((result) => {
                        if (result) {
                            if (result.userChoice)
                                lowerSubmitHandler({
                                    aventusUser,
                                    tokenAddress: POLK_AVT_CONTRACT_ADDRESS,
                                    amount: result._amount,
                                    t1Recipient,
                                    tokenType,
                                    AVN_GATEWAY_URL,
                                    AVN_RELAYER,
                                    EXPLORER_TX_URL,
                                }).then(() => setLowerLoading(false));
                            else {
                                setLowerLoading(false);
                            }
                        } else {
                            setLowerLoading(false);
                        }
                    });
                }}
            >
                <div className="text-start">
                    <h3 className="text-start" style={{ fontWeight: "700" }}>
                        Lower Token
                    </h3>
                    <span style={{ color: "#F65925", fontWeight: "700" }}>
                        AVT
                    </span>
                </div>
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        style={{ maxWidth: "100px" }}
                        id="Amount"
                    >
                        Amount
                    </span>
                    <input
                        type="text"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            weight: "bold",
                        }}
                        className="form-control"
                        aria-label="Amount"
                        aria-describedby="Amount"
                        size="83"
                        min={0}
                        required
                        pattern="^[0-9]\d*(\.\d+)?$"
                        placeholder="whole or fractional (eg: 10 or 1.053)"
                        id="tokenAmount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        style={{ maxWidth: "100px" }}
                        id="Recipient"
                    >
                        Recipient
                    </span>
                    <input
                        type="text"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            weight: "bold",
                        }}
                        className="form-control"
                        aria-label="Recipient"
                        aria-describedby="Recipient"
                        size="83"
                        maxLength="42"
                        minLength="42"
                        required
                        pattern="0x[0-9a-fA-F]{40}"
                        placeholder="Ethereum address (eg: 0x405df1b38510c455ef81500a3dc7e9ae599e18f6)"
                        id="t1Recipient"
                        value={t1Recipient}
                        onChange={(e) => setT1Recipient(e.target.value)}
                    />
                </div>
                <div className="text-start">
                    <button
                        type="submit"
                        className="btn submit-button mobile-bigButton"
                        disabled={lowerLoading}
                        style={{ fontWeight: "bold" }}
                    >
                        {lowerLoading ? <Spinner /> : "Submit"}
                    </button>
                    <div style={{ fontSize: "13px" }}>
                        <br />
                        Note: Lowering requires multiple signatures, please
                        follow all wallet prompts
                    </div>
                </div>
            </form>
        </div>
    );
}
