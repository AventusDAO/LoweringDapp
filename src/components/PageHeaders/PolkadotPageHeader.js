import React from "react";
import { PolkadotJS } from "../Polkadot/PolkadotJS";
import { HeaderNav } from "./HeaderNav";
import { NetworkDropdown } from "./NetworkDropdown";
import { PageLinks } from "./PageLinks";
import { LightDarkMode } from "../Theme/LightDarkMode";

function PolkadotPageHeader({ title, description }) {
    return (
        <div className="header-background">
            <section className="py-2 container">
                <HeaderNav />

                <div className="row py-lg-3 align-self-center mx-auto">
                    <div className="text-center" style={{ color: "black" }}>
                        <h1 className="maintitle align-self-center">{title}</h1>
                        <p className="text-center">{description}</p>
                    </div>
                    <small className="text-black text-left text-center">
                        {<PolkadotJS />}
                    </small>
                    <div
                        className="mx-auto py-lg-2"
                        style={{ marginTop: "10px" }}
                    >
                        <PageLinks />
                    </div>
                    <NetworkDropdown />
                    {/* <LightDarkMode /> */}
                </div>
            </section>
        </div>
    );
}

export default PolkadotPageHeader;
