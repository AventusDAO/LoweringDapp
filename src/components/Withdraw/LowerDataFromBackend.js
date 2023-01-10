import React, { useContext, useState } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { checkIfUserWantsToWithdrawNow } from "../../utils/checkIfUserWantsToWithdrawNow";
import { stateContext } from "../../Contexts/Context";
import tryGetAvnAccountAddress from "../../utils/polkadotFunctions/polkaKey";
import gear from "../../assets/img/gear-icon.svg";

export const LowerDataFromBackend = ({ tx }) => {
    const { account, networkId, avnContract, avnAddress } =
        useContext(stateContext);
    const [senderAddressFormat, setSenderAddressFormat] = useState(false);

    return (
        <div
            id={`lowersCollapse${tx.id}`}
            className="accordion-collapse collapse"
            aria-labelledby="lowersFromBackend"
            data-bs-parent="#readyLowersAccordion"
        >
            <div className="accordion-body">
                <ul className="list-group">
                    <div
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ width: "100%" }}
                    >
                        <div className="col-10">
                            {senderAddressFormat
                                ? `Sender (SS58 Address): ${addressSlicer(
                                      tryGetAvnAccountAddress(tx.from),
                                      10,
                                      38
                                  )}`
                                : `Sender (Public key): ${addressSlicer(
                                      tx.from,
                                      10,
                                      56
                                  )}`}
                        </div>
                        <div className="col-1 text-end">
                            <button className="gear-button ">
                                <img
                                    onClick={() => {
                                        setSenderAddressFormat(
                                            !senderAddressFormat
                                        );
                                    }}
                                    className="gearIcon"
                                    src={gear}
                                    alt="logo"
                                />
                            </button>
                        </div>
                    </div>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Recipient: {addressSlicer(tx.to, 8, 34)}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Token: {addressSlicer(tx.token, 8, 34)}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Amount: {tx.amount}
                    </li>
                </ul>
                {Object.keys(tx.claimData).length !== 0 ? (
                    <div
                        className="row"
                        style={{
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="col">
                            <span className="badge bg-success rounded-pill">
                                Ready
                            </span>
                        </div>
                        <div className="col-4">
                            <button
                                className="connect-button badge rounded-pill"
                                onClick={() => {
                                    checkIfUserWantsToWithdrawNow(
                                        tx.from,
                                        tx.claimData.leaf,
                                        tx.claimData.merklePath,
                                        account,
                                        avnContract,
                                        networkId,
                                        avnAddress
                                    );
                                }}
                            >
                                withdraw
                            </button>
                        </div>
                    </div>
                ) : (
                    <span className="badge bg-danger rounded-pill">
                        Not Ready
                    </span>
                )}
            </div>
        </div>
    );
};
