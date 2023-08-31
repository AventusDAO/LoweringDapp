import React from "react";
import Ethereum from "../Ethereum/Ethereum";
import { HeaderNav } from "./HeaderNav";
import { NetworkDropdown } from "./NetworkDropdown";
import { TabHeaders } from "./TabHeaders";

function EthereumPageHeader({ title, description, isValidPage }) {
    return (
        <div className="header-background">
            <section className="py-2 container">
                <HeaderNav />
                <div className="row py-lg-3 align-self-center mx-auto">
                    <div>
                        <div className="text-center" style={{ color: "black" }}>
                            <h1 className="maintitle align-self-center">
                                {title}
                            </h1>
                            <p className="text-center">{description}</p>
                        </div>
                        {isValidPage ? <EthWalletAndNetwork /> : ""}
                    </div>
                </div>
            </section>
            <div className="mx-auto" style={{ marginTop: "10px" }}>
                <TabHeaders />
            </div>
        </div>
    );
}

export function EthWalletAndNetwork() {
    return (
        <>
            <div className="row">
                <div className="col-sm">
                    <div className="placement-position">
                        <Ethereum />
                    </div>
                </div>

                <div className="align-self-end col">
                    <div className="text-end">
                        <NetworkDropdown />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EthereumPageHeader;
