import { withdrawSubmitHandler } from "../functions/submitHandlers";
import React from "react";
import useFetch from "./Extras/useFetch";

const ReadyToWithdraw = () => {
    const { data } = useFetch("http://localhost:8000/proposals");
    console.log(data);
    return (
        <div
            className="container fetch-container"
            style={{ minHeight: "100%" }}
        >
            <h1>Tokens ready to be withdrawn</h1>
            <small>Click on any to execute the lower transaction.</small>
            <br />
            <small>
                Question: How will people know if their transaction is in which
                lower below?
            </small>
            {data &&
                data.map((lowerTx) => (
                    <div key={lowerTx.id}>
                        <div className="row">
                            <div
                                className="btn card"
                                style={{
                                    borderRadius: "15px",
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    console.log("withdraw tx submitted");
                                    withdrawSubmitHandler(
                                        lowerTx.leaf,
                                        lowerTx.merklePath
                                    );
                                }}
                            >
                                <div className="row">
                                    <div className="col">
                                        <div className="text-start">
                                            <span className="card-status">
                                                {lowerTx.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <b
                                    style={{
                                        color: "#5100FF",
                                        fontWeight: 700,
                                    }}
                                >
                                    {/* {account.meta.name} */}
                                </b>{" "}
                                <p
                                    style={{
                                        fontWeight: "normal",
                                    }}
                                >
                                    {/* {account.address} */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ReadyToWithdraw;
