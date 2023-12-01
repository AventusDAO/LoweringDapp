import LoadWeb3 from "./loadWeb3";
import ABI from "../../config/abi.js";
import {
	metamaskMissingErrorHandler,
	metamaskConnectionErrorHandler,
} from "../errorPopups/walletErrorPopups";
import checkEthereumConnection from "./checkEthereumConnection";

export async function getContract(address) {
	const load = await LoadWeb3();
	const tokenContract = new load.eth.Contract(ABI, address);
	return tokenContract;
}

export async function connectMetamaskButton({
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
}) {
	try {
		let accounts_ = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		let account;
		let netId;

		if (loadWeb3) {
			account = accounts_[0];
			netId = await loadWeb3.eth.net.getId();
		}
		if (accounts_) {
			await checkEthereumConnection({
				web3: loadWeb3,
				account,
				setEthereumAccount,
				NETWORK_ID,
				netId,
				setMetamaskNetworkId,
				setBridgeContract,
				setMainTokenContract,
				BRIDGE_CONTRACT_ADDRESS,
				PRIMARY_TOKEN_ADDRESS,
				EVM_NETWORK_NAME,
				setEVM_NETWORK_NAME,
				isAppPage: false,
			});
		}
	} catch (err) {
		if (err.code === 4001) {
			metamaskConnectionErrorHandler();
		} else {
			metamaskMissingErrorHandler();
		}
	}
}
