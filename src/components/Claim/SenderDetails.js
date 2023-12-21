import React, { useState } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import tryGetSubstrateAccountAddress from "../../utils/polkadotUtils/polkaKey";
import toggleSwitch from "../../assets/img/toggleSwitch.svg";

export function SenderDetails({ tx }) {
	const [senderAddressFormat, setSenderAddressFormat] = useState(false);

	return (
		<div
			className="d-flex justify-content-between align-items-center"
			style={{ width: "100%" }}
		>
			<div className="col-11">
				{senderAddressFormat ? (
					<div className="input-group mb-3">
						<span
							className="input-group-text"
							style={{ minWidth: "100px" }}
						>
							Sender
						</span>
						<input
							type="text"
							id="expandAddressTip"
							disabled
							readOnly
							style={{
								backgroundColor: "white",
								color: "black",
								weight: "bold",
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							className="mobile-ext form-control"
							value={addressSlicer(
								tryGetSubstrateAccountAddress(tx.from),
								10,
								38
							)}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
						<input
							type="text"
							id="expandAddressTip"
							disabled
							readOnly
							style={{
								backgroundColor: "white",
								color: "black",
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
								weight: "bold",
							}}
							className="desktop-ext form-control"
							value={tryGetSubstrateAccountAddress(tx.from)}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</div>
				) : (
					<div className="input-group mb-3">
						<span
							className="input-group-text"
							style={{ minWidth: "100px" }}
							id="basic-addon1"
						>
							Sender
						</span>
						<input
							type="text"
							disabled
							readOnly
							style={{
								backgroundColor: "white",
								color: "black",
								weight: "bold",
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							className="desktop-ext form-control"
							value={tx.from}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
						<input
							type="text"
							disabled
							readOnly
							style={{
								backgroundColor: "white",
								color: "black",
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
								weight: "bold",
							}}
							className="mobile-ext form-control"
							value={addressSlicer(tx.from, 10, 56)}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</div>
				)}
			</div>

			<div className="col-1 text-end">
				<button className="gear-button">
					<img
						id="senderAddressTip"
						onClick={() => {
							setSenderAddressFormat(!senderAddressFormat);
						}}
						className="gearIcon"
						src={toggleSwitch}
						alt="logo"
					/>
				</button>
			</div>
		</div>
	);
}
