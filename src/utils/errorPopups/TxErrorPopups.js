import swal from "sweetalert2";

export function lowerError(err) {
	return swal.fire({
		title: "Lower Status",
		text: err,
		allowOutsideClick: false,
		icon: "info",
		confirmButtonText: "Okay",
		confirmButtonColor: "#5100FF",
	});
}

export function transactionErrorHandler(err) {
	return swal.fire({
		title: "Transaction Failure",
		text: err.toString(),
		allowOutsideClick: false,
		icon: "error",
		confirmButtonText: "Okay",
		confirmButtonColor: "#5100FF",
	});
}

export function invalidTokenAmountHandler(tokenType) {
	return swal.fire({
		title: "Invalid Token",
		text: `Must be a valid ${tokenType} token existing on this network`,
		allowOutsideClick: false,
		icon: "error",
		confirmButtonColor: "#5100FF",
		confirmButtonText: "Okay",
	});
}

export function invalidAddressErrorHandler() {
	return swal.fire({
		title: "Invalid Recipient",
		text: "The Recipient account must be a valid SS58 address",
		allowOutsideClick: false,
		icon: "error",
		confirmButtonColor: "#5100FF",
		confirmButtonText: "Okay",
	});
}

export function isZeroErrorHandler() {
	return swal.fire({
		title: "Invalid Amount",
		text: "Amount cannot be zero",
		allowOutsideClick: false,
		icon: "error",
		confirmButtonColor: "#5100FF",
		confirmButtonText: "Okay",
	});
}

export function invalidTokenErrorHandler(tokenType) {
	return swal.fire({
		title: "Invalid Token",
		text: `Must be a valid ${tokenType} token existing on this network`,
		allowOutsideClick: false,
		icon: "error",
		confirmButtonText: "Okay",
		confirmButtonColor: "#5100FF",
	});
}
