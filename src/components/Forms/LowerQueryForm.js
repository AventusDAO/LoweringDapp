import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../../Contexts/Context";
import { networkErrorHandler } from "../../utils/errorHandlers";
/*
Form to take in the user's search item. The search item could be: sender address, sender public key, recipient eth address.
Currentlh includes some dummy code until the backend is set up
*/

function LowerQueryForm() {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const { freezeDapp } = useContext(stateContext);

    return (
        <div
            className="container form-container"
            style={{
                marginBottom: "20%",
                minHeight: "100%",
            }}
        >
            <div
                className="row mx-auto align-self-center text-center tab-content justify-center"
                id="myTabContent"
            >
                <div
                    className="tab-pane py-3 fade show active custom-lower-tab-width"
                    id="non-avt-tab-pane"
                    role="tabpanel"
                    aria-labelledby="non-avt-tab"
                    tabIndex="0"
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            freezeDapp
                                ? networkErrorHandler()
                                : navigate(`/lowers/${address}`);
                        }}
                    >
                        <div className="row mb-3">
                            <label
                                htmlFor="address"
                                className="col-sm-2 col-form-label"
                            >
                                Address
                            </label>
                            <div className="col-sm-10">
                                <input
                                    size="83"
                                    type="text"
                                    required
                                    minLength={42}
                                    pattern="0x[0-9a-fA-F]{64}|5[0-9a-zA-Z]{47}|0x[0-9a-fA-F]{40}"
                                    maxLength={66}
                                    className="form-control"
                                    placeholder="Aventus Sender or Ethereum Recipient address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="address"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn lift-button rounded-0"
                            style={{ fontWeight: "bold" }}
                        >
                            Query Pending Lowers
                        </button>
                        <div style={{ fontSize: "13px" }}>
                            <br />
                            Query the state of your Lower transaction request.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LowerQueryForm;
