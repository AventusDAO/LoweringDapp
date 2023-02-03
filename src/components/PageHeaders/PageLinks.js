import React from "react";
import { Link } from "react-router-dom";

export const PageLinks = () => {
    return (
        <div className="mx-auto headerLinks">
            <Link className="pageLinks" to="/">
                Lower{" "}
            </Link>
            <Link className="pageLinks" to="/balance">
                Balance{" "}
            </Link>
            <Link className="pageLinks" to="/claim">
                Claim{" "}
            </Link>
        </div>
    );
};
