import swal from "sweetalert2";
const PRIMARY_TOKEN = window?.appConfig?.PRIMARY_TOKEN;

export async function gatewayAccessError(_hasPayer) {
	if (_hasPayer) {
		gatewayAccessErrorForNoPayer();
	} else {
		gatewayAccessErrorForNoMinimumBalance();
	}
}

export async function gatewayAccessErrorForNoPayer() {
	const { isConfirmed: isGenerateNewToken } = await swal.fire({
		title: "Gateway Access Block",
		html: `<strong> It appears you're not part of a registered payer program.</strong>You'll need to sign to generate a new token.`,
		allowOutsideClick: false,
		icon: "error",
		confirmButtonText: "Okay",
		confirmButtonColor: "#5100FF",
		denyButtonColor: "green",
	});
	if (isGenerateNewToken) {
		return false;
	}
	return isGenerateNewToken;
}

export async function gatewayAccessErrorForNoMinimumBalance() {
	const { isDenied: isGenerateNewToken } = await swal.fire({
		title: "Gateway Access Block",
		html: `You need to have at least 1 ${PRIMARY_TOKEN} in your balance <strong> on this network </strong> to gain access.`,
		allowOutsideClick: false,
		icon: "error",
		confirmButtonText: "Okay",
		confirmButtonColor: "#F65925",
		denyButtonColor: "green",
		showDenyButton: true,
		denyButtonText: "Generate New Token",
		footer: "If this is a mistake, click on Generate New Token.",
	});
	if (isGenerateNewToken) {
		return await regenerateGatewayToken();
	}
}

export async function regenerateGatewayToken() {
	const { isConfirmed: isGenerateNewToken } = await swal.fire({
		title: "Regenerate Gateway Token",
		text: "This operation will generate a new AWT token for you to access the chain via the Gateway.",
		allowOutsideClick: false,
		icon: "info",
		confirmButtonText: "Confirm",
		confirmButtonColor: "green",
		denyButtonColor: "red",
		showDenyButton: true,
		denyButtonText: "Cancel",
	});
	if (isGenerateNewToken) {
		return await gotAPayer();
	}
}

export async function gotAPayer() {
	const { isConfirmed: hasPayer } = await swal.fire({
		title: "Got A Payer?",
		html: "Is there an <b>Enterprise account</b> designated to pay for your transactions?",
		allowOutsideClick: false,
		icon: "info",
		showDenyButton: true,
		confirmButtonText: "Yes",
		denyButtonText: "No",
		confirmButtonColor: "green",
		footer: "We can still authenticate you if you don't have a payer.",
	});
	return hasPayer;
}
