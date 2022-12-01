import { backendQueryHandler } from "../functions/backendQuery";
import React, { useContext } from "react";
import { stateContext } from "../Contexts/Context";

const WithdrawReady = (data) => {
    const lowers = data.lowers;
    const { account, networkId, avn_contract } = useContext(stateContext);

    return (
        <>
            <div className="accordion" id="accordionExample">
                {lowers &&
                    lowers.map((tx) => (
                        <div key={tx.recipient}>
                            <div className="accordion-item">
                                <h2
                                    className="accordion-header"
                                    id="headingOne"
                                >
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                    >
                                        Recipient: {tx.recipient}
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Sender: {tx.address}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Recipient: {tx.recipient}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Amount: {tx.amount}
                                            </li>
                                        </ul>
                                        <div className="row">
                                            <div className="col">
                                                {tx.status === "Ready" ? (
                                                    <span className="badge bg-success rounded-pill">
                                                        {tx.status}
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-danger rounded-pill">
                                                        {tx.status}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-3">
                                                <button
                                                    className="connect-button btn badge rounded-pill"
                                                    onClick={() => {
                                                        backendQueryHandler(
                                                            tx.address,
                                                            tx.leaf,
                                                            tx.merkle_path,
                                                            account,
                                                            avn_contract,
                                                            networkId
                                                        );
                                                    }}
                                                >
                                                    withdraw
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default WithdrawReady;
