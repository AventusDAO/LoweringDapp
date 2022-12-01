import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
Form to take in the user's search item. The search item could be: sender address, sender public key, recipient eth address.
Currentlh includes some dummy code until the backend is set up
*/

function LowerQueryForm() {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");

    return (
        <div className="container form-container" style={{ minHeight: "100%" }}>
            <div
                className="row mx-auto align-self-center text-center tab-content justify-center"
                id="myTabContent"
            >
                <div
                    className="tab-pane py-3 fade show active"
                    id="non-avt-tab-pane"
                    role="tabpanel"
                    aria-labelledby="non-avt-tab"
                    tabIndex="0"
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            navigate(`/lowers/${address}`); //dummy code until the backend is set up
                        }}
                    >
                        <div className="row mb-3">
                            <label
                                htmlFor="UUID"
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
                                    maxLength={66}
                                    className="form-control"
                                    placeholder="Aventus Sender or Ethereum Recipient address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="UUID"
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
