import aventus_logo from "../../assets/img/aventus-logo.svg";
import { Link } from "react-router-dom";

export function HeaderNav() {
	return (
		<>
			<nav className="navbar">
				<div className="container-fluid">
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
						style={{ backgroundColor: "#5100FF" }}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarToggleExternalContent"
						aria-controls="navbarToggleExternalContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>
			<div className="collapse" id="navbarToggleExternalContent">
				<div className="p-4 text-end">
					<ul className="navbar-nav mr-auto justify-content-between w-100">
						<li className="nav-item">
							<Link
								className="nav-link text-dark text-decoration-none"
								to="/FAQ"
							>
								FAQ
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link text-dark text-decoration-none"
								to="/"
							>
								Home
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
			</div>
		</>
	);
}
