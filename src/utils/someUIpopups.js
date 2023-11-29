import swal from "sweetalert2";

export async function balanceAdjustedNotification(title, message, footer) {
	const { isConfirmed: result } = await swal.fire({
		title,
		text: message,
		showDenyButton: true,
		allowOutsideClick: false,
		icon: "info",
		confirmButtonText: "Continue",
		denyButtonText: "Cancel",
		confirmButtonColor: "green",
		footer,
	});
	return result;
}

export async function userConfirmation() {
	const { isConfirmed: result } = await swal.fire({
		title: "Signature Required",
		html: `This may prompt multiple sign operations but <b> you only pay once </b>`,
		showDenyButton: true,
		allowOutsideClick: false,
		icon: "info",
		confirmButtonText: "Continue",
		denyButtonText: "Cancel",
		confirmButtonColor: "green",
	});
	return result;
}

export const userBalance = async ({ tokenType, message, decAmount }) => {
	await swal.fire({
		title: `${tokenType} Balance`,
		text: decAmount,
		allowOutsideClick: false,
		icon: "info",
		confirmButtonColor: "#5100FF",
		confirmButtonText: "Okay",
		footer: `<p class="text-center">${
			tokenType === "AVT"
				? `${message}`
				: tokenType === "TOKEN"
				? "Confirm the decimals for this token on the token's Ethereum smart contract"
				: ""
		}
                    </p>`,
	});
};

export async function transactionSubmitted(id) {
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

export async function confirmAWTTokenClearance() {
	const { isConfirmed } = await swal.fire({
		title: "Are you sure?",
		text: "This action will clear your existing AWT token and generate a new token.",
		showDenyButton: true,
		showConfirmButton: true,
		confirmButtonText: "Yes",
		allowOutsideClick: false,
		denyButtonText: "No",
		confirmButtonColor: "green",
		footer: "This action does not impact your account balance.",
	});
	return isConfirmed;
}
