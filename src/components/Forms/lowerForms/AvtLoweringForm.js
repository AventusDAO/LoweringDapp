import React, { useContext } from "react";
import { formContext, stateContext } from "../../../Contexts/Context";
import { lowerSubmitHandler } from "../../../utils/avnFunctions/lowerSubmitHandler";
import { confirmLowerDetails } from "../../../utils/lowerUIchecks";
import { Spinner } from "../../Extras/Tools";

export default function AvtLoweringForm() {
    const {
        amount,
        setAmount,
        t1Recipient,
        setT1Recipient,
        lowerLoading,
        setLowerLoading,
    } = useContext(formContext);

    const { sender, AVN_GATEWAY_URL, AVN_RELAYER, POLK_AVT_CONTRACT_ADDRESS } =
        useContext(stateContext);

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
                    confirmLowerDetails(
                        sender.address,
                        "AVT",
                        POLK_AVT_CONTRACT_ADDRESS,
                        amount
                    ).then((result) => {
                        if (result)
                            lowerSubmitHandler(
                                sender,
                                POLK_AVT_CONTRACT_ADDRESS,
                                amount,
                                t1Recipient,
                                AVN_GATEWAY_URL,
                                AVN_RELAYER
                            ).then(() => setLowerLoading(false));
                        else {
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
