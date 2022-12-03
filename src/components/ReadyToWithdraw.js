import { backendQueryHandler } from "../functions/backendQuery";
import React, { useContext } from "react";
import { stateContext } from "../Contexts/Context";
import { addressSlicer } from "../functions/randomFunctions";

const ReadyToWithdraw = (data) => {
    const lowers = data.lowers;
    const { account, networkId, avnContract } = useContext(stateContext);

    return (
        <>
            <div className="accordion" id="accordionExample">
                {lowers && (
                    <div>
                        <h1 className="maintitle">
                            Tokens ready to be withdrawn
                        </h1>
                        <small>
                            Click on any to execute the lower transaction.
                        </small>
                        <br />
                        {lowers.map((tx) => (
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
                                            Recipient:{" "}
                                            {addressSlicer(tx.recipient, 8, 34)}
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
                                                    Sender:{" "}
                                                    {addressSlicer(
                                                        tx.address,
                                                        8,
                                                        34
                                                    )}
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Recipient:{" "}
                                                    {addressSlicer(
                                                        tx.recipient,
                                                        8,
                                                        34
                                                    )}
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
                                                <div className="col">
                                                    <button
                                                        className="connect-button btn badge rounded-pill"
                                                        onClick={() => {
                                                            backendQueryHandler(
                                                                tx.address,
                                                                tx.leaf,
                                                                tx.merklePath,
                                                                account,
                                                                avnContract,
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
                )}
            </div>
        </>
    );
};

export default ReadyToWithdraw;
