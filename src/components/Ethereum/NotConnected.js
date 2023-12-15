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
		PRIMARY_TOKEN_ADDRESS,
		EVM_NETWORK_NAME,
		setEVM_NETWORK_NAME,COMPANY_NAME_WITH_UNDERSCORE,
	} = useContext(stateContext);
	return (
		<div className="metamask-button">
			<div style={{ fontSize: "11px" }}>
				<br />
				<span className="text-muted">Not connected</span>
			</div>
			<button
				type="button"
				className={`btn ${COMPANY_NAME_WITH_UNDERSCORE}-connect-button ${COMPANY_NAME_WITH_UNDERSCORE}-btn mobile-bigButton`}
				onClick={() => {
					connectMetamaskButton({
						loadWeb3,
						setEthereumAccount,
						NETWORK_ID,
						setMetamaskNetworkId,
						setBridgeContract,
						setMainTokenContract,
						BRIDGE_CONTRACT_ADDRESS,
						PRIMARY_TOKEN_ADDRESS,
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
