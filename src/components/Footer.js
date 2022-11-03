import React from "react";
import aventus_logo from "../assets/img/aventus-logo-sygnet-light.svg";

function Footer() {
    return (
        <div className="bottom">
            <div className="footer mt-auto py-3">
                <footer className="container">
                    <a
                        href="https://www.aventus.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={aventus_logo}
                            style={{ width: "80px" }}
                            className="img-footer"
                            alt="logo"
                        />
                    </a>
                </footer>
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
