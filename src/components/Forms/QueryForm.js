import React, { useState, useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { querySubmitHandler } from "../../functions/submitHandlers";

function QueryForm() {
    const [UUID, setUUID] = useState("");
    const { account, networkId, avn_contract } = useContext(stateContext);
    function clearValues() {
        setUUID("");
    }

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
                            console.log(UUID, account, avn_contract, networkId);
                            querySubmitHandler(
                                UUID,
                                account,
                                avn_contract,
                                networkId
                            );
                        }}
                    >
                        <div className="row mb-3">
                            <label
                                htmlFor="UUID"
                                className="col-sm-2 col-form-label"
                            >
                                UUID
                            </label>
                            <div className="col-sm-10">
                                <input
                                    size="83"
                                    style={{
                                        marginLeft: "5px",
                                        marginRight: "105px",
                                    }}
                                    type="text"
                                    required
                                    className="form-control"
                                    placeholder="Transaction UUID (eg: f6130a95-57c8-4ef0-8b71-0a77ce6f9320)"
                                    // pattern="^[A-Za-z0-9]+$"
                                    maxLength="36"
                                    minLength="36"
                                    value={UUID}
                                    onChange={(e) => setUUID(e.target.value)}
                                    id="UUID"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn lift-button rounded-0"
                            style={{ fontWeight: "bold" }}
                        >
                            Query UUID status
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

export default QueryForm;
