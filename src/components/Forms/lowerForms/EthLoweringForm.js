import React, { useContext } from "react";
import { formContext, stateContext } from "../../../Contexts/Context";
import { lowerSubmitHandler } from "../../../utils/avnFunctions/lowerSubmitHandler";
import { confirmLowerDetails } from "../../../utils/lowerUIchecks";
import { Spinner } from "../../Extras/Tools";

export default function EthLoweringForm() {
    const {
        amount,
        setAmount,
        t1Recipient,
        setT1Recipient,
        lowerLoading,
        setLowerLoading,
    } = useContext(formContext);

    const { sender, AVN_GATEWAY_URL, AVN_RELAYER, networkState } =
        useContext(stateContext);

    const ETH_CONTRACT_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const networkId = networkState === "MAINNET" ? 1 : 5;

    return (
        <div
            className="tab-pane py-3 fade custom-lower-tab-width"
            id="ETH-tab-pane"
            role="tabpanel"
            aria-labelledby="ETH-tab"
            tabIndex="0"
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setLowerLoading(true);
                    confirmLowerDetails(
                        sender.address,
                        "ETH",
                        "Ethereum ETH",
                        amount,
                        networkId
                    ).then((result) => {
                        if (result) {
                            if (result.userChoice)
                                lowerSubmitHandler(
                                    sender,
                                    ETH_CONTRACT_ADDRESS,
                                    result._tokenAmount,
                                    t1Recipient,
                                    AVN_GATEWAY_URL,
                                    AVN_RELAYER
                                ).then(() => setLowerLoading(false));
                            else {
                                setLowerLoading(false);
                            }
                        } else {
                            setLowerLoading(false);
                        }
                    });
                }}
            >
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
                            maxLength={20}
                            pattern="^[0-9]\d*(\.\d+)?$"
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
                    className="btn lift-button rounded-0"
                    disabled={lowerLoading}
                    style={{ fontWeight: "bold" }}
                >
                    {lowerLoading ? <Spinner /> : "Lower"}
                </button>
                <div style={{ fontSize: "13px" }}>
                    <br />
                    Note: Lowering requires multiple signatures, please follow all wallet prompts
                </div>
            </form>
        </div>
    );
}
