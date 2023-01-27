import React, { useContext } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { checkIfUserWantsToWithdrawNow } from "../../utils/checkIfUserWantsToWithdrawNow";
import { stateContext } from "../../Contexts/Context";
import { SenderDetails } from "./SenderDetails";
import Tippy from "@tippyjs/react";

export const LowerDataFromBackend = ({ tx }) => {
    const { account, networkId, avnContract, networkState } =
        useContext(stateContext);

    return (
        <div
            id={`lowersCollapse${tx.id}`}
            className="accordion-collapse collapse"
            aria-labelledby="lowersFromBackend"
            data-bs-parent="#readyLowersAccordion"
        >
            <div className="accordion-body">
                <ul className="list-group">
                    <li className="d-flex">
                        <SenderDetails tx={tx} />
                    </li>
                    <li className="d-flex">
                        <div className="input-group mb-3">
                            <Tippy content={tx.to} placement="top">
                                <span
                                    className="input-group-text"
                                    style={{ maxWidth: "100px" }}
                                    id="Recipient"
                                >
                                    Recipient
                                </span>
                            </Tippy>
                            <input
                                type="text"
                                id="recipientAddressTip"
                                disabled
                                style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    weight: "bold",
                                }}
                                className="mobile-ext form-control"
                                placeholder={addressSlicer(tx.to, 8, 34)}
                                aria-label="Recipient"
                                aria-describedby="Recipient"
                            />
                            <input
                                type="text"
                                id="recipientAddressTip"
                                disabled
                                style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    weight: "bold",
                                }}
                                className="desktop-ext form-control"
                                placeholder={tx.to}
                                aria-label="Recipient"
                                aria-describedby="Recipient"
                            />
                        </div>
                    </li>
                    <li className="d-flex">
                        <div className="input-group mb-3">
                            <Tippy content={tx.token} placement="top">
                                <span
                                    className="input-group-text"
                                    style={{ minWidth: "100px" }}
                                    id="basic-addon1"
                                >
                                    Token
                                </span>
                            </Tippy>
                            <input
                                type="text"
                                disabled
                                id="tokenAddressTip"
                                style={{
                                    backgroundColor: "white",
                                }}
                                className="desktop-ext form-control"
                                placeholder={tx.token}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <input
                                type="text"
                                disabled
                                id="tokenAddressTip"
                                style={{
                                    backgroundColor: "white",
                                }}
                                className="mobile-ext form-control"
                                placeholder={addressSlicer(tx.token, 8, 34)}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </li>
                    <li className="d-flex">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                style={{ minWidth: "100px" }}
                                id="basic-addon1"
                            >
                                Amount
                            </span>
                            <input
                                type="text"
                                disabled
                                style={{
                                    backgroundColor: "white",
                                }}
                                className="form-control"
                                placeholder={tx.amount}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </li>
                </ul>

                {Object.keys(tx.claimData).length !== 0 ? (
                    <div
                        style={{
                            justifyContent: "space-between",
                        }}
                    >
                        <button
                            className="connect-button btn justify-content-center items-align-center"
                            onClick={() => {
                                checkIfUserWantsToWithdrawNow(
                                    tx.from,
                                    tx.claimData.leaf,
                                    tx.claimData.merklePath,
                                    account,
                                    avnContract,
                                    networkId,
                                    networkState
                                );
                            }}
                        >
                            Claim
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
