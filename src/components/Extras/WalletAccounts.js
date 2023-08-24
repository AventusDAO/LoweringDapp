import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { capitaliseFirstLetter } from "../../utils/randomFunctions";
import { addressSlicer } from "../../utils/randomFunctions";
import { ConnectOrDisconnectAddressInCryptoWallet } from "./ConnectOrDisconnect";

export const WalletAccounts = () => {
    const { substrateAccounts } = useContext(stateContext);

    return (
        <div>
            {substrateAccounts &&
                substrateAccounts.map((account) => (
                    <div key={account.address}>
                        <div className="row">
                            <div
                                className="btn card-modal card"
                                style={{
                                    borderRadius: "15px",
                                    backgroundColor: "white",
                                }}
                            >
                                <div className="row">
                                    <div
                                        className="col"
                                        style={{ marginLeft: "-10px" }}
                                    >
                                        <div className="text-start">
                                            <span className="card-author">
                                                <b>
                                                    {capitaliseFirstLetter(
                                                        account.name
                                                    )}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="col"
                                        style={{ marginLeft: "-10px" }}
                                    >
                                        <div className="text-start">
                                            <span className="card-author">
                                                <b>
                                                    {addressSlicer(
                                                        account.address,
                                                        -44,
                                                        44
                                                    )}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                    <ConnectOrDisconnectAddressInCryptoWallet
                                        account={account}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
