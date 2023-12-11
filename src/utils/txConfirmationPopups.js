import swal from "sweetalert2";

const LOWER_DURATION = window?.appConfig?.LOWER_DURATION;

export async function TxSubmitted(id) {
	await swal
		.fire({
			title: `Transaction Submitted`,
			text: "Confirmation will follow shortly",
			allowOutsideClick: false,
			icon: "success",
			showConfirmButton: true,
			confirmButtonText: "Okay",
			confirmButtonColor: "#5100FF",
			showCloseButton: true,
		})
		.then(() => {
			navigator.clipboard.writeText(id);
		});
}

export async function showUserStakeTxStatus({ polledState, explorerTxUrl }) {
	if (polledState.status === "Processed") {
		await swal.fire({
			title: "Lower Successful",
			showCloseButton: true,
			text: `You'll need to complete Step-2 after ${LOWER_DURATION} to claim your tokens on Ethereum.`,
			allowOutsideClick: false,
			confirmButtonColor: "#ffffff",
			showConfirmButton: false,
			footer: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on Explorer</a>`,
			icon: "success",
		});
		return "complete";
	} else if (polledState.status === "Rejected") {
		await swal.fire({
			title: "Lower failed",
			showCloseButton: true,
			text: "The transaction was rejected by the Chain, please check the details and retry",
			confirmButtonColor: "#ffffff",
			showConfirmButton: false,
			footer: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on Explorer</a>`,
			allowOutsideClick: false,
			icon: "error",
		});
		return "complete";
	} else if (polledState.status === "Transaction not found") {
		await swal.fire({
			title: polledState.status,
			showCloseButton: true,
			text: "Transaction not found. Please ensure you are querying the right network.",
			allowOutsideClick: false,
			showConfirmButton: true,
			confirmButtonColor: "#5100FF",
			confirmButtonText: "Okay",
			icon: "info",
		});
		return "complete";
	}
}

export async function cannotConfirmTxStatus({ polledState, explorerTxUrl }) {
	await swal.fire({
		title: `Unconfirmed Transaction Status`,
		text: `Please monitor your transaction using the transaction hash below: ${polledState.txHash}`,
		showCloseButton: true,
		allowOutsideClick: false,
		showConfirmButton: false,
		icon: "success",
		footer: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on the Explorer</a>`,
	});
	return "complete";
}
