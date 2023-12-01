import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import greenIcon from "../../assets/img/green-icon.png";

export const ConnectToEthereum = () => {
	const { ethereumAccount, EVM_NETWORK_NAME } = useContext(stateContext);

	return (
		<div className="small-line account-info">
			{EVM_NETWORK_NAME ? (
				<div>
					<div className="small-line account-info">
						<div style={{ fontSize: "11px" }}>
							<img
								src={greenIcon}
								width={20}
								height={20}
								alt="logo"
							/>
							<span className="fw-bold">
								Connected Ethereum account (on{" "}
								{EVM_NETWORK_NAME}
								):
							</span>
							<br />
							<br />
						</div>
						<br />
						<br />
						<br />
						<span
							className="desktop-ext"
							id="account"
							style={{ fontSize: "11px" }}
						>
							{ethereumAccount}
						</span>
						<span
							className="mobile-ext"
							id="account"
							style={{ fontSize: "11px" }}
						>
							{ethereumAccount}
						</span>
					</div>
				</div>
			) : (
				<span style={{ color: "red" }}>Unsupported Network</span>
			)}
		</div>
	);
};
