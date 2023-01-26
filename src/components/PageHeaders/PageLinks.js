import React from "react";
import { Link } from "react-router-dom";

export const PageLinks = () => {
    return (
        <div className="mx-auto headerLinks">
            <Link className="pageLinks" to="/">
                Initiate Lower{" "}
            </Link>
            <Link className="pageLinks" to="/balance">
                AvN Balance{" "}
            </Link>
            <Link className="pageLinks" to="/withdraw">
                Complete Token{" "}
            </Link>
        </div>
    );
};
