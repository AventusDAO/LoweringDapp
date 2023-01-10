import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <div className="text-center">
                <strong>
                    <Link
                        style={{
                            color: "White",
                            textDecoration: "none",
                        }}
                        to="/FAQ"
                    >
                        FAQ
                    </Link>
                </strong>
            </div>
            <div
                className="text-center font-weight-bold  my-2"
                style={{ backgroundColor: "white", color: "#1D2733" }}
            >
                &copy; Aventus {new Date().getFullYear()}
            </div>
        </div>
    );
}

export default Footer;
