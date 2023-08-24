import React from "react";
import { PolkadotJS } from "../Polkadot/PolkadotJS";
import { HeaderNav } from "./HeaderNav";
import { TabHeaders } from "./TabHeaders";
import { NetworkDropdown } from "./NetworkDropdown";

export default function PolkadotPageHeader({
    title,
    description,
    isValidPage,
}) {
    return (
        <div>
            <section className="py-2 container">
                <HeaderNav />

                <div className="row py-lg-3 align-self-center mx-auto">
                    <div className="text-center" style={{ color: "black" }}>
                        <h1 className="maintitle align-self-center">{title}</h1>
                        <p className="text-center">{description}</p>
                    </div>
                    {isValidPage ? <WalletAndNetwork /> : ""}
                </div>
            </section>
            <div className="mx-auto" style={{ marginTop: "10px" }}>
                <TabHeaders />
            </div>
        </div>
    );
}

export function WalletAndNetwork() {
    return (
        <>
            <div className="row">
                <div className="col-sm">
                    <div className="placement-position">
                        <PolkadotJS />
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
