import React, { useContext } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { claimNow } from "../../utils/ethereumUtils/claimNow";
import { stateContext } from "../../Contexts/Context";
import { SenderDetails } from "./SenderDetails";

export const LowerDataFromBackend = ({ tx }) => {
	const {
		ethereumAccount,
		metamaskNetworkId,
		bridgeContract,
		ETHERSCAN_TOKEN_LINK,
	} = useContext(stateContext);

	return (
		<div
			id={`lowersCollapse${tx.id}`}
			className="accordion-collapse collapse"
			aria-labelledby="lowersFromBackend"
			data-bs-parent="#readyLowersAccordion"
		>
			<div className="accordion-body">
				<ul className="list-group">
					<li className="d-flex">
						<SenderDetails tx={tx} />
					</li>
					<li className="d-flex">
						<div className="input-group mb-3">
							<span
								className="input-group-text"
								style={{ maxWidth: "100px" }}
								id="Recipient"
							>
								Recipient
							</span>
							<input
								type="text"
								id="recipientAddressTip"
								disabled
								readOnly
								style={{
									backgroundColor: "white",
									color: "black",
									weight: "bold",
								}}
								className="mobile-ext form-control"
								value={addressSlicer(tx.to, 8, 34)}
								aria-label="Recipient"
								aria-describedby="Recipient"
							/>
							<input
								type="text"
								id="recipientAddressTip"
								disabled
								readOnly
								style={{
									backgroundColor: "white",
									color: "black",
									weight: "bold",
								}}
								className="desktop-ext form-control"
								value={tx.to}
								aria-label="Recipient"
								aria-describedby="Recipient"
							/>
						</div>
					</li>
					<li className="d-flex">
						<div className="input-group mb-3">
							<span
								className="input-group-text"
								style={{ minWidth: "100px" }}
								id="basic-addon1"
							>
								Amount
							</span>
							<input
								type="text"
								disabled
								readOnly
								style={{
									backgroundColor: "white",
								}}
								className="form-control"
								value={tx.amount}
								aria-label="Username"
								aria-describedby="basic-addon1"
							/>
						</div>
					</li>
					{tx.token && (
						<li className="d-flex">
							<div className="input-group mb-3">
								<a
									href={`${ETHERSCAN_TOKEN_LINK}${tx.token}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									View token{" "}
								</a>
							</div>
						</li>
					)}
				</ul>
				{Object.keys(tx.claimData).length !== 0 ? (
					<div
						style={{
							justifyContent: "space-between",
						}}
					>
						<button
							className="submit-button mobile-bigButton btn justify-content-center items-align-center"
							onClick={() => {
								claimNow({
									leaf: tx.claimData.leaf,
									merklePath: tx.claimData.merklePath,
									ethereumAccount,
									bridgeContract,
									metamaskNetworkId,
								});
							}}
						>
							Claim
						</button>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};
