import React, { useContext } from "react";
import { stateContext } from "../Contexts/Context";
import aventus_logo from "../assets/img/aventus-logo.svg";
import PolkadotJS from "./Polkadot/PolkadotJS";
import { Link } from "react-router-dom";

function PolkadotPageHeader({ title, description }) {
    const {
        account,
        networkId,
        switchChecked,
        setSwitchChecked,
        setNetwork_state,
        setTestnet_state,
    } = useContext(stateContext);

    return (
        <div className="header-background">
            <section className="py-2 container">
                <nav className="navbar navbar-expand-lg navbar-light nav-fill w-100">
                    <a
                        href="https://www.aventus.io/"
                        className="navbar-brand"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={aventus_logo} alt="logo" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse font-weight-bold"
                        id="navbarText"
                    >
                        <ul className="navbar-nav mr-auto justify-content-between w-100">
                            <li className="nav-item active">
                                <a
                                    className="nav-link text-dark text-decoration-none"
                                    href="https://www.aventus.io/technology/"
                                >
                                    Technology{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark text-decoration-none"
                                    href="https://www.aventus.io/ecosystem/"
                                >
                                    Ecosystem
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark text-decoration-none"
                                    href="https://www.aventus.io/use-cases/"
                                >
                                    Use Cases
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-dark text-decoration-none"
                                    href="https://www.aventus.io/documentation/"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-decoration-none text-white"
                                    href="https://www.aventus.io/contact/"
                                >
                                    <span
                                        style={{
                                            backgroundColor: "#F65925",
                                            padding: "10px",
                                        }}
                                    >
                                        Contact
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="row py-lg-3 align-self-center mx-auto">
                    <div className="text-center">
                        <h1 className="maintitle align-self-center">{title}</h1>
                        <p className="text-center">{description}</p>
                    </div>
                    <small className="text-black text-left text-center">
                        {<PolkadotJS />}
                    </small>
                    <div
                        className="mx-auto py-lg-2"
                        style={{ marginTop: "10px" }}
                    >
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
                    </div>
                    <div>
                        <div className="select-button text-center align-self-center mx-auto">
                            <select
                                className="form-select row"
                                aria-label="aventus test networks"
                                id="lang"
                                onChange={(e) =>
                                    setNetwork_state(e.target.value)
                                }
                            >
                                <option defaultValue value="Mainnet">
                                    AvN Mainnet
                                </option>
                                <option value="Public_Testnet">
                                    AvN Public Testnet
                                </option>
                                <option value="DEV">AvN Development</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PolkadotPageHeader;
