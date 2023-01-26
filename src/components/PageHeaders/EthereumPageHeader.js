import React from "react";
import Ethereum from "../Ethereum/Ethereum";
import { HeaderNav } from "./HeaderNav";
import { PageLinks } from "./PageLinks";
import { NetworkDropdown } from "./NetworkDropdown";

function EthereumPageHeader() {
    return (
        <div className="header-background">
            <section className="py-2 container">
                <HeaderNav />
                <div className="row py-lg-3 align-self-center mx-auto">
                    <div>
                        <div className="text-center" style={{ color: "black" }}>
                            <h1 className="maintitle">Complete Lower</h1>
                            <p className="text-center">
                                Claim any outstanding lowers on Ethereum
                            </p>
                        </div>
                        <small className="text-black text-left text-center">
                            {<Ethereum />}
                        </small>

                        <div
                            className="mx-auto py-lg-3"
                            style={{ marginTop: "10px" }}
                        >
                            <PageLinks />
                        </div>
                        <NetworkDropdown />
                        {/* <LightDarkMode /> */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EthereumPageHeader;
