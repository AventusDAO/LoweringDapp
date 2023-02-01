import React from "react";
import { Link } from "react-router-dom";

export const PageLinks = () => {
    return (
        <div className="mx-auto headerLinks">
            <Link className="pageLinks" to="/">
                Lower{" "}
            </Link>
            <Link className="pageLinks" to="/balance">
                Balances{" "}
            </Link>
            <Link className="pageLinks" to="/withdraw">
                Claim Lowers{" "}
            </Link>
        </div>
    );
};
