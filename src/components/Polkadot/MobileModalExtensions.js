import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";
import { connectSpecificWallet } from "../../utils/polkadotUtils/walletUtils";
import { WalletAccounts } from "../Extras/WalletAccounts";

function MobileModalExtensions() {
	const {
		setSubstrateAccounts,
		substrateAccounts,
		substrateUser,
		setWalletName,
	} = useContext(stateContext);

	const wallets = ["polkadot-js"];

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
										{/* This text implementation is specifically for Nova Wallet. */}
										<span className="card-author">
											<b>Nova</b>
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
			<div className="text-start" style={{ margin: "5px" }}>
				<b>Accounts: </b>{" "}
				{!substrateAccounts && "Select from the above extensions."}{" "}
			</div>
			<WalletAccounts />
		</div>
	);
}

export { MobileModalExtensions };
