import React from "react";
import { Link } from "react-router-dom";

export const PageLinks = () => {
    return (
        <div className="mx-auto headerLinks">
            <Link
                style={{
                    color: "black",
                    textDecoration: "none",
                }}
                to="/"
            >
                Lower Token{" "}
            </Link>
            <Link
                style={{
                    color: "black",
                    textDecoration: "none",
                }}
                to="/balance"
            >
                Balance{" "}
            </Link>
            <Link
                style={{
                    color: "black",
                    textDecoration: "none",
                }}
                to="/withdraw"
            >
                Withdraw Token{" "}
            </Link>
        </div>
    );
};
