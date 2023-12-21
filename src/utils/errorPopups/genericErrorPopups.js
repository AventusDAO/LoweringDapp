import swal from "sweetalert2";
const BUTTON_COLOR = window?.appConfig?.BUTTON_COLOR;

export async function genericErrorHandlerTemplate(title, text, footText) {
	await swal.fire({
		title,
		text,
		icon: "error",
		confirmButtonText: "Okay",
		allowOutsideClick: false,
		footer: footText ? `<p class="text-center">${footText}</p>` : "",
		confirmButtonColor: BUTTON_COLOR,
	});
}
