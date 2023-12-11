import swal from "sweetalert2";
import { regenerateGatewayToken } from "../someUIpopups";

const PRIMARY_TOKEN = window?.appConfig?.PRIMARY_TOKEN;
const BUTTON_COLOR = window?.appConfig?.BUTTON_COLOR;

export async function gatewayAccessError(_hasPayer) {
	if (_hasPayer) {
		return await gatewayAccessErrorForNoPayer();
	} else {
		return await gatewayAccessErrorForNoMinimumBalance(_hasPayer);
	}
}

export async function gatewayAccessErrorForNoPayer() {
	const { isConfirmed: isGenerateNewToken } = await swal.fire({
		title: "Gateway Access Block",
		html: `<strong> It appears you're not registered under the Enterprise access program.</strong>Clicking 'Okay' will generate a new access token.`,
		allowOutsideClick: false,
		icon: "error",
		confirmButtonText: "Okay",
		confirmButtonColor: BUTTON_COLOR,
		denyButtonColor: "green",
	});
	if (isGenerateNewToken) {
		return false;
	}
	return isGenerateNewToken;
}

export async function gatewayAccessErrorForNoMinimumBalance(_hasPayer) {
	const { isDenied: cancel, isConfirmed: isGenerateNewToken } =
		await swal.fire({
			title: "Gateway Access Block",
			html: `You need to have at least 1 ${PRIMARY_TOKEN} in your balance <strong> on this network </strong> to gain access.`,
			allowOutsideClick: false,
			icon: "error",
			denyButtonText: "Okay",
			confirmButtonColor: BUTTON_COLOR,
			denyButtonColor: "black",
			showDenyButton: true,
			confirmButtonText: "Generate New Token",
			footer: "If this is a mistake, click on Generate New Token.",
		});
	if (cancel) {
		return _hasPayer;
	} else if (isGenerateNewToken) {
		return await regenerateGatewayToken();
	}
}
