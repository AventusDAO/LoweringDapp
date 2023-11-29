import React from "react";
import { Link } from "react-router-dom";
const COMPANY_NAME = window?.appConfig?.NETWORK?.COMPANY_NAME;

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
						Frequently Asked Questions
					</Link>
				</strong>
			</div>
			<div
				className="text-center font-weight-bold  my-2"
				style={{ backgroundColor: "white", color: "#1D2733" }}
			>
				&copy; {COMPANY_NAME} {new Date().getFullYear()}
			</div>
		</div>
	);
}

export default Footer;
