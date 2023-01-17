import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import Ethereum from "../Ethereum/Ethereum";
import { HeaderNav } from "./HeaderNav";
import { PageLinks } from "./PageLinks";
import { NetworkDropdown } from "./NetworkDropdown";
import { LightDarkMode } from "../Theme/LightDarkMode";
// import LoadWeb3 from "../../functions/ethereumFunctions/loadWeb3";

function EthereumPageHeader() {
    const { networkId } = useContext(stateContext);

    return (
        <div className="header-background">
            <section className="py-2 container">
                <HeaderNav />
                <div className="row py-lg-3 align-self-center mx-auto">
                    <div>
                        <div className="text-center" style={{ color: "black" }}>
                            <h1 className="maintitle">Query & Withdraw</h1>
                            <p className="text-center">
                                Claim the tokens you have lowered on Ethereum
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
