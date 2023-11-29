import React, { useContext } from "react";
import { setStorageItems } from "../../utils/polkadotUtils/walletUtils";
import { stateContext } from "../../Contexts/Context";

// Allows a user connect or disconnect an account from an available crypto wallet.

export function ConnectOrDisconnectAddressInCryptoWallet({ account }) {
	const { substrateUser } = useContext(stateContext);
	return (
		<div className="col" style={{ marginRight: "-15px" }}>
			{substrateUser.address === account.address &&
			substrateUser.source === account.source ? (
				<Disconnect />
			) : (
				<Connect account={account} />
			)}
		</div>
	);
}

export function Disconnect() {
	const { setSubstrateAccounts, setSubstrateUser } = useContext(stateContext);

	function disconnectSubstrateWallet() {
		setSubstrateUser("");
		setSubstrateAccounts("");
		localStorage.clear("user");
		localStorage.clear("activeExtension");
	}
	return (
		<div className="text-end">
			<button
				className="btn disconnect-btn card-status"
				data-bs-dismiss="modal"
				onClick={disconnectSubstrateWallet}
			>
				Disconnect
			</button>
		</div>
	);
}

export function Connect({ account }) {
	const { setSubstrateUser, walletName } = useContext(stateContext);
	return (
		<div className="text-end">
			<button
				className="account-connect-button"
				data-bs-dismiss="modal"
				onClick={() => {
					setSubstrateUser(account);
					setStorageItems(account.address, walletName);
				}}
			>
				Connect
			</button>
		</div>
	);
}
