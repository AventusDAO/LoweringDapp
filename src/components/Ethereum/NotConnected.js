import { connectMetamaskButton } from "../../utils/ethereumUtils/randomEthFunctions";
import React, { useContext } from "react";
import { stateContext } from "../../Contexts/Context";

export const NotConnected = () => {
	const {
		loadWeb3,
		setEthereumAccount,
		NETWORK_ID,
		setMetamaskNetworkId,
		setBridgeContract,
		setMainTokenContract,
		BRIDGE_CONTRACT_ADDRESS,
		MAIN_TOKEN_ADDRESS,
		EVM_NETWORK_NAME,
		setEVM_NETWORK_NAME,
	} = useContext(stateContext);
	return (
		<div className="metamask-button">
			<div style={{ fontSize: "11px" }}>
				<br />
				<span className="text-muted">Not connected</span>
			</div>
			<button
				type="button"
				className="btn connect-button mobile-bigButton"
				onClick={() => {
					connectMetamaskButton({
						loadWeb3,
						setEthereumAccount,
						NETWORK_ID,
						setMetamaskNetworkId,
						setBridgeContract,
						setMainTokenContract,
						BRIDGE_CONTRACT_ADDRESS,
						MAIN_TOKEN_ADDRESS,
						EVM_NETWORK_NAME,
						setEVM_NETWORK_NAME,
					});
				}}
			>
				Connect to Metamask
			</button>
		</div>
	);
};
