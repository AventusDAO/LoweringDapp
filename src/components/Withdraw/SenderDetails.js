import React, { useState } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import tryGetAvnAccountAddress from "../../utils/polkadotFunctions/polkaKey";
import toggleSwitch from "../../assets/img/toggleSwitch.svg";
import Tippy from "@tippyjs/react";

export function SenderDetails({ tx }) {
    const [senderAddressFormat, setSenderAddressFormat] = useState(false);

    return (
        <div
            className="d-flex justify-content-between align-items-center"
            style={{ width: "100%" }}
        >
            <div className="col-11">
                {senderAddressFormat ? (
                    <div className="input-group mb-3">
                        <Tippy
                            content={tryGetAvnAccountAddress(tx.from)}
                            placement="top"
                        >
                            <span
                                className="input-group-text"
                                style={{ minWidth: "100px" }}
                            >
                                Sender
                            </span>
                        </Tippy>
                        <input
                            type="text"
                            id="expandAddressTip"
                            disabled
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                weight: "bold",
                            }}
                            className="mobile-ext form-control"
                            placeholder={addressSlicer(
                                tryGetAvnAccountAddress(tx.from),
                                10,
                                38
                            )}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <input
                            type="text"
                            id="expandAddressTip"
                            disabled
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                weight: "bold",
                            }}
                            className="desktop-ext form-control"
                            placeholder={tryGetAvnAccountAddress(tx.from)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                ) : (
                    <div className="input-group mb-3">
                        <Tippy content={tx.from} placement="top">
                            <span
                                className="input-group-text"
                                style={{ minWidth: "100px" }}
                                id="basic-addon1"
                            >
                                Sender
                            </span>
                        </Tippy>
                        <input
                            type="text"
                            disabled
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                weight: "bold",
                            }}
                            className="desktop-ext form-control"
                            placeholder={tx.from}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <input
                            type="text"
                            disabled
                            style={{
                                backgroundColor: "white",
                                color: "black",
                                weight: "bold",
                            }}
                            className="mobile-ext form-control"
                            placeholder={addressSlicer(tx.from, 10, 56)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                )}
            </div>

            <div className="col-1 text-end">
                <button className="gear-button">
                    <Tippy content="Change Address Format" placement="top">
                        <img
                            id="senderAddressTip"
                            onClick={() => {
                                setSenderAddressFormat(!senderAddressFormat);
                            }}
                            className="gearIcon"
                            src={toggleSwitch}
                            alt="logo"
                        />
                    </Tippy>
                </button>
            </div>
        </div>
    );
}
