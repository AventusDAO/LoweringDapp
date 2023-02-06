import React from "react";
import { Link } from "react-router-dom";

export const PageLinks = () => {
    return (
        <div className="mx-auto headerLinks">
            <Link className="pageLinks" to="/">
                Step 1{" "}
            </Link>
            <Link className="pageLinks" to="/claim">
                Step 2{" "}
            </Link>
            <Link className="pageLinks" to="/balance">
                Balance{" "}
            </Link>
        </div>
    );
};
