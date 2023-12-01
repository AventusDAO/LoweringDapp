import { userBalance } from "./someUIpopups";
import balanceConverter from "ethereum-unit-converter";
import swal from "sweetalert2";

export function capitaliseFirstLetter(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addressSlicer(address, num1, num2) {
	try {
		return address.slice(0, num1) + "..." + address.slice(num2);
	} catch (err) {
		return null;
	}
}

export const balanceFormatter = ({ tokenType, balance }) => {
	const message = "This is your FREE balance. See FAQ for more.";
	const SUPPORTED_TOKENS = window?.appConfig?.NETWORK?.SUPPORTED_TOKENS;
	const mainToken = SUPPORTED_TOKENS.PRIMARY_TOKEN.value;
	if (tokenType === mainToken || tokenType === "ETH") {
		const resValue = Number(balance);
		const result = balanceConverter(resValue, "wei", "ether");
		return userBalance({ tokenType, decAmount: result, message });
	} else {
		return userBalance({
			tokenType,
			decAmount: balance,
		});
	}
};

export function copyUUID(value) {
	const el = document.createElement("input");
	el.value = value;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}

export function copyTxDetails(value) {
	const item = document.createElement("input");
	item.value = value;
	document.body.appendChild(item);
	item.select();
	document.execCommand("copy");
	document.body.removeChild(item);
}

export function txLinkInAlert({ hash }) {
	const NETWORK_CONFIG = window?.appConfig?.NETWORK;
	const ETHERSCAN_TX_LINK = NETWORK_CONFIG?.ETHERSCAN_TX_LINK;
	const EVM_NETWORK_NAME = NETWORK_CONFIG?.EVM_NETWORK_NAME;

	swal.fire({
		title: `${EVM_NETWORK_NAME} Transaction Submitted`,
		html: "Your funds are on their way",
		confirmButtonColor: "#ffffff",
		showConfirmButton: false,
		footer: `<a href="${ETHERSCAN_TX_LINK}${hash}" target="_blank">View transaction on the explorer</a>`,
		allowOutsideClick: false,
		icon: "success",
		showCloseButton: true,
	});
}
