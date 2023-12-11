import React, { useContext } from "react";
import Ethereum from "../Ethereum/Ethereum";
import { HeaderNav } from "./HeaderNav";
import { TabHeaders } from "./TabHeaders";
import { stateContext } from "../../Contexts/Context";

function EthereumPageHeader({ title, description, isValidPage }) {
	return (
		<div className="header-background">
			<section className="py-2 container">
				<HeaderNav />
				<div className="row py-lg-3 align-self-center mx-auto">
					<div>
						<div className="text-center" style={{ color: "black" }}>
							<h1 className="maintitle align-self-center">
								{title}
							</h1>
							<p className="text-center">{description}</p>
						</div>
						{isValidPage ? <EthWalletAndNetwork /> : ""}
					</div>
				</div>
			</section>
			<div className="mx-auto" style={{ marginTop: "10px" }}>
				<TabHeaders />
			</div>
		</div>
	);
}

export function EthWalletAndNetwork() {
	const { ALTERNATE_NETWORK_NAME, ALTERNATE_NETWORK_URL } =
		useContext(stateContext);

	return (
		<>
			<div className="row">
				<div className="col-sm">
					<div className="placement-position">
						<Ethereum />
					</div>
				</div>

				{ALTERNATE_NETWORK_NAME && (
					<div className="align-self-end desktop-ext col text-end">
						<a
							href={ALTERNATE_NETWORK_URL}
							style={{ textDecoration: "none" }}
							rel="noopener noreferrer"
						>
							<button className="btn connect-button mobile-bigButton">
								Switch To {ALTERNATE_NETWORK_NAME}
							</button>
						</a>
					</div>
				)}
				{ALTERNATE_NETWORK_NAME && (
					<div
						className="align-self-end mobile-ext col text-center"
						style={{ marginTop: "10px" }}
					>
						<a
							href={ALTERNATE_NETWORK_URL}
							style={{ textDecoration: "none" }}
							rel="noopener noreferrer"
						>
							<button className="btn connect-button mobile-bigButton">
								Switch To {ALTERNATE_NETWORK_NAME}
							</button>
						</a>
					</div>
				)}
			</div>
		</>
	);
}

export default EthereumPageHeader;
