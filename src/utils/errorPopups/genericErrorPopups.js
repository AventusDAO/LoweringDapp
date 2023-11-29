import swal from "sweetalert2";

export function genericErrorHandlerTemplate(title, text, footText) {
	return swal.fire({
		title,
		text,
		icon: "error",
		confirmButtonText: "Okay",
		allowOutsideClick: false,
		footer: footText ? `<p class="text-center">${footText}</p>` : "",
		confirmButtonColor: "#5100FF",
	});
}
