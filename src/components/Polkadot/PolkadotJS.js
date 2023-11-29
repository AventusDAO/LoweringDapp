import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { PolkadotExtensions } from "../Extras/PolkadotExtensions";
import greenIcon from "../../assets/img/green-icon.png";
import arrowLeftRight from "../../assets/img/arrow-left-right-circle-black.svg";
import { addressSlicer } from "../../utils/randomFunctions";

export function PolkadotJS() {
	const { substrateUser } = useContext(stateContext);

	if (substrateUser) {
		return (
			<div>
				<div className="small-line account-info">
					<div style={{ fontSize: "11px" }}>
						<img
							src={greenIcon}
							width={20}
							height={20}
							alt="logo"
						/>
						<span className="fw-bold">Connected AvN account:</span>
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
						{substrateUser.address}
					</span>
					<span
						className="mobile-ext"
						id="account"
						style={{ fontSize: "11px" }}
					>
						{addressSlicer(substrateUser.address, 15, 40)}
					</span>
				</div>
				<div
					className="flex align-self-center justify-center"
					style={{ marginTop: "15px" }}
				>
					<button
						type="button"
						className="btn connect-button mobile-bigButton"
						data-bs-toggle="modal"
						data-bs-target="#extensionsModal"
					>
						<img src={arrowLeftRight} alt="logo" /> Switch Account
					</button>
					<PolkadotExtensions />
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div style={{ fontSize: "11px" }}>
					<br />
					<span className="text-muted">Not connected</span>
				</div>
				<button
					type="button"
					className="btn connect-button mobile-bigButton"
					data-bs-toggle="modal"
					data-bs-target="#extensionsModal"
				>
					+ Connect Wallet
				</button>
				<PolkadotExtensions />
			</div>
		);
	}
}
