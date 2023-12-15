import swal from "sweetalert2";
import {
	substrateConnectFailure,
	metamaskConnectionErrorHandler,
} from "./errorPopups/walletErrorPopups";
import { genericErrorHandlerTemplate } from "./errorPopups/genericErrorPopups";
import { amountChecker } from "./ethereumUtils/decimalHandler";

// for erc20 and 777 tokens
export async function ercConfirmLowerDetails({
	substrateUserAddress,
	ethereumAccount,
	tokenType,
	tokenAddress,
	amount,
	t1Recipient,
	NETWORK_ID,
	metamaskNetworkId,
	isERC20,
	isERC777,
	EVM_NETWORK_NAME,
}) {
	if (substrateUserAddress) {
		if (!ethereumAccount) {
			metamaskConnectionErrorHandler(
				"Metamask is required to confirm the token details"
			);
		} else {
			const isCorrectEthereumNetwork = metamaskNetworkId === NETWORK_ID;
			if (!isCorrectEthereumNetwork) {
				genericErrorHandlerTemplate(
					"Switch EVM Network",
					`Please ensure your EVM wallet network is set to ${EVM_NETWORK_NAME}.`,
					"Metamask is required to confirm the token contract's details."
				);
			} else {
				const _amount = await amountChecker({
					amount,
					tokenAddress,
					isERC20,
					isERC777,
				});
				if (_amount) {
					const ETHERSCAN_TOKEN_LINK =
						window?.appConfig?.ETHERSCAN_TOKEN_LINK;

					const { isConfirmed: userChoice } = await swal.fire({
						title: "Confirm details",
						html: `<small>Lower ${amount} <a href=${ETHERSCAN_TOKEN_LINK}${tokenAddress} target="_blank"> ${tokenType} </a> to ${t1Recipient} ?</small>`,
						showDenyButton: true,
						showConfirmButton: true,
						confirmButtonText: "Yes",
						allowOutsideClick: false,
						denyButtonText: "No",
						confirmButtonColor: "green",
						footer: `<strong>full decimal value</strong>:&nbsp${_amount}`,
					});
					return { userChoice, _amount };
				} else {
					if (isERC20) {
						genericErrorHandlerTemplate(
							"Cannot Find Token Contract",
							`Please confirm this token exists on ${EVM_NETWORK_NAME}.`,
							`Only ${EVM_NETWORK_NAME} contracts are supported.`
						);
					} else {
						genericErrorHandlerTemplate(
							"Is not ERC777",
							`Please confirm that this token's contract exists on ${EVM_NETWORK_NAME} and is ERC777 standard.`,
							`Only ${EVM_NETWORK_NAME} contracts are supported.`
						);
					}
				}
			}
		}
	} else {
		substrateConnectFailure();
	}
}

export async function userSignatureConfirmation() {
	const { isConfirmed: result } = await swal.fire({
		title: "Signature Required",
		text: "Sign to validate your account",
		allowOutsideClick: false,
		showDenyButton: true,
		confirmButtonText: "Sign",
		denyButtonText: "Don't Sign",
		confirmButtonColor: "green",
		footer: "This operation is free",
	});
	return result ? result : "";
}

// for the main token and eth tokens
export async function confirmLowerDetails({
	substrateUserAddress,
	tokenType,
	tokenAddress,
	amount,
	t1Recipient,
}) {
	if (substrateUserAddress) {
		const _amount = await amountChecker({
			amount,
			tokenAddress,
			isERC20: false,
			isERC777: false,
		});
		const ETHERSCAN_TOKEN_LINK = window?.appConfig?.ETHERSCAN_TOKEN_LINK;
		const { isConfirmed: userChoice } = await swal.fire({
			title: "Confirm details",
			html: `<small>Lower ${amount} <a href=${ETHERSCAN_TOKEN_LINK}${tokenAddress} target="_blank"> ${tokenType} </a> to ${t1Recipient} ?</small>`,
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: "Yes",
			allowOutsideClick: false,
			denyButtonText: "No",
			confirmButtonColor: "green",
			footer: `<strong>full decimal value</strong>:&nbsp${_amount}`,
		});
		return { userChoice, _amount };
	} else {
		substrateConnectFailure();
	}
}
