import { checkIfUserWantsToWithdrawNow } from "../functions/checkIfUserWantsToWithdrawNow";
import React, { useContext, useState } from "react";
import { stateContext } from "../Contexts/Context";
import { addressSlicer } from "../functions/randomFunctions";
import { Pagination } from "./Pagination";

const ReadyToWithdraw = ({ lowers }) => {
    const { account, networkId, avnContract } = useContext(stateContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [lowersPerPage] = useState(4);
    const indexOfLastPost = currentPage * lowersPerPage;
    const indexOfFirstPost = indexOfLastPost - lowersPerPage;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    var currentLowers;
    if (lowers) {
        currentLowers = lowers.slice(indexOfFirstPost, indexOfLastPost);
        const lowerId = currentLowers.length;
        for (let i = 0; i < lowerId; i++) {
            currentLowers[i].id = i;
        }
    }

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
                        {currentLowers.map((tx) => (
                            <div key={tx.id}>
                                <div className="accordion-item">
                                    <h2
                                        className="accordion-header"
                                        id="headingOne"
                                    >
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${tx.id}`}
                                            aria-expanded="false"
                                            aria-controls="collapseOne"
                                        >
                                            Recipient:{" "}
                                            {addressSlicer(tx.recipient, 8, 34)}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${tx.id}`}
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
                                                        className="connect-button badge rounded-pill"
                                                        onClick={() => {
                                                            checkIfUserWantsToWithdrawNow(
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
                        <Pagination
                            lowersPerPage={lowersPerPage}
                            totalLowers={lowers.length}
                            paginate={paginate}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default ReadyToWithdraw;
