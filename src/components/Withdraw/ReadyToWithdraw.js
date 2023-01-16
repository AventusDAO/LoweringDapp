import React, { useState } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import BackButton from "../Extras/BackButton";
import { LowerDataFromBackend } from "./LowerDataFromBackend";
import { Pagination } from "../Pagination";

const ReadyToWithdraw = ({ lowers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const lowersPerPage = 4;
    const indexOfLastPost = currentPage * lowersPerPage;
    const indexOfFirstPost = indexOfLastPost - lowersPerPage;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    var data;
    var currentLowers;
    if (lowers) {
        data = lowers.lowerData;
        data.forEach((tx, index) => {
            tx.id = index;
        });
        currentLowers = data.slice(indexOfFirstPost, indexOfLastPost);
    }

    return (
        <>
            <div
                className="accordion"
                id="readyLowersAccordion"
                style={{ marginBottom: "30%" }}
            >
                {lowers && (
                    <div>
                        <div className="col"></div>
                        <BackButton />
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
                                        id="lowersFromBackend"
                                    >
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#lowersCollapse${tx.id}`}
                                            aria-expanded="false"
                                            aria-controls="lowersFromBackend"
                                        >
                                            {Object.keys(tx.claimData)
                                                .length !== 0 ? (
                                                <div
                                                    // className="row"
                                                    style={{
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <span className="badge bg-success rounded-pill">
                                                        Ready
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="badge bg-danger rounded-pill">
                                                    Not Ready
                                                </span>
                                            )}

                                            {`Recipient: ${addressSlicer(
                                                tx.to,
                                                8,
                                                34
                                            )}`}
                                            <br />
                                        </button>
                                    </h2>
                                    <LowerDataFromBackend tx={tx} />
                                </div>
                                <br />
                            </div>
                        ))}
                        <Pagination
                            tabsPerPage={lowersPerPage}
                            totalTabs={data.length}
                            paginate={paginate}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default ReadyToWithdraw;
