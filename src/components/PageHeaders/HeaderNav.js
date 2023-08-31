import aventus_logo from "../../assets/img/aventus-logo.svg";
import { Link } from "react-router-dom";

export function HeaderNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-fill">
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
                    <li className="nav-item">
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
                        <Link
                            className="nav-link text-dark text-decoration-none"
                            to="/FAQ"
                        >
                            FAQ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link text-decoration-none text-white"
                            href="https://www.aventus.io/contact/"
                        >
                            <span
                                style={{
                                    backgroundColor: "#5100FF",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                            >
                                Contact
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
