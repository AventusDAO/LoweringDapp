import React, { useContext } from "react";
import { addressSlicer } from "../../utils/randomFunctions";
import { claimNow } from "../../utils/ethereumUtils/claimNow";
import { stateContext } from "../../Contexts/Context";
import { SenderDetails } from "./SenderDetails";

export const LowerDataFromBackend = ({ tx }) => {
	const { ETHERSCAN_TOKEN_LINK } = useContext(stateContext);

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
									borderTopRightRadius: "5px",
									borderBottomRightRadius: "5px",
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
									borderTopRightRadius: "5px",
									borderBottomRightRadius: "5px",
									weight: "bold",
								}}
								className="desktop-ext form-control"
								value={tx.to}
								aria-label="Recipient"
								aria-describedby="Recipient"
							/>
						</div>
					</li>
					<div className="row">
						<li className="d-flex col-sm">
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
										borderTopRightRadius: "5px",
										borderBottomRightRadius: "5px",
									}}
									className="form-control"
									value={tx.amount}
									aria-label="Username"
									aria-describedby="basic-addon1"
								/>
							</div>
						</li>
						{tx.lowerId && (
							<li className="d-flex col-sm-4">
								<div className="input-group mb-3">
									<span
										className="input-group-text"
										style={{ minWidth: "100px" }}
										id="basic-addon1"
									>
										Lower ID
									</span>
									<input
										type="text"
										disabled
										readOnly
										style={{
											borderTopRightRadius: "5px",
											borderBottomRightRadius: "5px",
											backgroundColor: "white",
										}}
										className="form-control"
										value={tx.lowerId}
										aria-label="Username"
										aria-describedby="basic-addon1"
									/>
								</div>
							</li>
						)}
					</div>
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
				{tx.claimData ? (
					typeof tx.claimData === "string" ? (
						<NewLowerMethod claimData={tx.claimData} />
					) : (
						<OldLowerMethod claimData={tx.claimData} />
					)
				) : (
					""
				)}
			</div>
		</div>
	);
};

function OldLowerMethod({ claimData }) {
	const {
		ethereumAccount,
		metamaskNetworkId,
		bridgeContract,
		COMPANY_NAME_WITH_UNDERSCORE,
	} = useContext(stateContext);

	return (
		<>
			{Object.keys(claimData).length !== 0 ? (
				<div
					style={{
						justifyContent: "space-between",
					}}
				>
					<button
						className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-submit-button mobile-bigButton ${COMPANY_NAME_WITH_UNDERSCORE}-btn justify-content-center items-align-center`}
						onClick={() => {
							claimNow({
								leaf: claimData.leaf,
								merklePath: claimData.merklePath,
								ethereumAccount,
								bridgeContract,
								metamaskNetworkId,
								method: "old",
							});
						}}
					>
						Claim
					</button>
				</div>
			) : (
				""
			)}
		</>
	);
}

function NewLowerMethod({ claimData }) {
	const {
		ethereumAccount,
		metamaskNetworkId,
		bridgeContract,
		COMPANY_NAME_WITH_UNDERSCORE,
	} = useContext(stateContext);

	return (
		<>
			{Object.keys(claimData).length !== 0 ? (
				<div
					style={{
						justifyContent: "space-between",
					}}
				>
					<button
						className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-submit-button mobile-bigButton ${COMPANY_NAME_WITH_UNDERSCORE}-btn justify-content-center items-align-center`}
						onClick={() => {
							claimNow({
								claimData,
								ethereumAccount,
								bridgeContract,
								metamaskNetworkId,
								method: "new",
							});
						}}
					>
						Claim
					</button>
				</div>
			) : (
				""
			)}
		</>
	);
}
