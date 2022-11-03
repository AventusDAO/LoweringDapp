import React, { useContext, useEffect } from "react";
import { stateContext } from "../../Contexts/Context";
import useFetchForGateway from "../Extras/useFetchForGateway";
import { basicQueryHandler } from "../../functions/queryHandler";

function AventusBalance() {
    const { sender, polkAccounts, accountBalance } = useContext(stateContext);
    const url = "https://testnet.gateway.aventus.io/query";
    const method = "getAccountInfo";
    const params = {
        accountId: sender.address,
    };
    // console.log(sender, url, method, params);
    // const { data } = useFetchForGateway(sender, url, method, params);
    // console.log(data);

    async function getData() {
        const data = await basicQueryHandler(sender, method);
        console.log(data);
    }
    let data = undefined;
    // useEffect(() => {
    //     data = getData();
    // }, []);

    console.log(data);
    return (
        <div
            className="modal fade"
            data-bs-backdrop="static"
            id="accountBalanceModal"
            tabIndex="-1"
            aria-labelledby="accountBalanceModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="accountBalanceModalLabel"
                        >
                            <b>Account Balance</b>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {data && (
                        <div className="modal-body" style={{ margin: "25px" }}>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{ color: "#5100FF" }}
                                >
                                    <b>Free Balance</b>{" "}
                                </div>
                                <div className="col">
                                    {data.freeBalance.substring(0, 4)}
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{ color: "#5100FF" }}
                                >
                                    <b>Staked Balance</b>{" "}
                                </div>
                                <div className="col">
                                    {data.stakedBalance.substring(0, 4)}
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{ color: "#5100FF" }}
                                >
                                    <b>Total Balance</b>{" "}
                                </div>
                                <div className="col">
                                    {data.totalBalance.substring(0, 4)}
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{ color: "#5100FF" }}
                                >
                                    <b>Unlocked Balance</b>{" "}
                                </div>
                                <div className="col">
                                    {data.unlockedBalance.substring(0, 4)}
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{ color: "#5100FF" }}
                                >
                                    <b>Unlocked Balance</b>{" "}
                                </div>
                                <div className="col">
                                    {data.unstakedBalance.substring(0, 4)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AventusBalance;
