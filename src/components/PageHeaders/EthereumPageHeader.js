import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import Ethereum from "../Ethereum/Ethereum";
import { HeaderNav } from "./HeaderNav";
import { PageLinks } from "./PageLinks";
import { NetworkDropdown } from "./NetworkDropdown";
// import LoadWeb3 from "../../functions/ethereumFunctions/loadWeb3";

function EthereumPageHeader() {
    const { networkId } = useContext(stateContext);

    return (
        <div className="header-background">
            <section className="py-2 container">
                <HeaderNav />
                <div className="row py-lg-3 align-self-center mx-auto">
                    <div>
                        <div className="text-center">
                            <h1 className="maintitle">Query & Withdraw</h1>
                            <p className="text-center">
                                Withdraw ready tokens to Ethereum
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
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EthereumPageHeader;
