import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { capitaliseFirstLetter } from "../../utils/randomFunctions";
import { connectSpecificWallet } from "../../utils/polkadotUtils/walletUtils";
import { WalletAccounts } from "../Extras/WalletAccounts";
import GenerateNewToken from "../Extras/GenerateNewToken";
import SetEnterpriseStatus from "../Extras/SetEnterpriseStatus";

function DesktopModalExtensions() {
	const {
		setSubstrateAccounts,
		substrateAccounts,
		substrateUser,
		setWalletName,
	} = useContext(stateContext);

	const wallets = ["polkadot-js", "talisman", "subwallet-js"];

	return (
		<div>
			<div className="text-start" style={{ margin: "5px" }}>
				<b>Supported Wallets: </b>
			</div>
			<div className="row">
				{wallets.map((wallet) => (
					<div key={wallet}>
						<div className="row">
							<div
								className="btn card card-modal"
								style={{
									borderRadius: "15px",
									backgroundColor: "white",
								}}
								onClick={() => {
									connectSpecificWallet(wallet).then(
										(accounts) => {
											setWalletName(wallet);
											setSubstrateAccounts(accounts);
										}
									);
								}}
							>
								<div className="row">
									<div
										className="col text-start card-author"
										style={{ marginLeft: "-10px" }}
									>
										<span className="card-author">
											<b>
												{capitaliseFirstLetter(wallet)}
											</b>
										</span>
									</div>
									<div
										className="col"
										style={{ marginRight: "-15px" }}
									>
										{substrateUser &&
											wallet === substrateUser.source && (
												<div className="text-end">
													<span className="card-status">
														Active
													</span>
												</div>
											)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<br />
			<div style={{ margin: "5px" }}>
				<div className="row">
					<div className="col text-start">
						{substrateUser && <SetEnterpriseStatus />}
					</div>
					<div className="col text-end">
						{substrateUser && <GenerateNewToken />}
					</div>
				</div>
				<br />
				<b>Accounts: </b>{" "}
				{!substrateAccounts && "Select from the above extensions."}{" "}
			</div>
			<WalletAccounts />
		</div>
	);
}

export { DesktopModalExtensions };
