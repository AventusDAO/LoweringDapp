import swal from "sweetalert2";
import { capitaliseFirstLetter } from "./randomFunctions";
import { Link } from "react-router-dom";

export function substrateNotDetected(name) {
    let url;
    if (name === "talisman") {
        url =
            "https://docs.talisman.xyz/talisman/navigating-the-paraverse/account-management/download-the-extension";
    } else if (name === "subwallet-js") {
        url = "https://subwallet.app/download.html";
    } else {
        url = "https://polkadot.js.org/extension/";
    }
    swal.fire({
        title: `${capitaliseFirstLetter(name)} extension not detected!`,
        text: "To interact with this DApp you must first download and install the extension in your browser",
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonColor: "#ffffff",
        confirmButtonText: name
            ? `<a href=${url} target="_blank">Download ${name}</a>`
            : "",
        icon: "error",
        footer: `<p class="text-center">If the wallet is installed, confirm this dapp is approved to access the wallet from within Manage Website Access in the extension.`,
    });
}

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

export function substrateConnectFailure() {
    swal.fire({
        title: "Substrate wallet not connected!",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#5100FF",
    });
}

export function metamaskMissingErrorHandler() {
    return swal.fire({
        title: "Metamask not detected!",
        text: "Please ensure you have the latest version of Metamask installed",
        confirmButtonColor: "#ffffff",
        confirmButtonText: `<a href="https://metamask.io/download/" target="_blank">Download Metamask</a>`,
        allowOutsideClick: false,
        icon: "error",
        showCloseButton: true,
    });
}

export function metamaskConnectionErrorHandler(val) {
    swal.fire({
        title: "Metamask not connected!",
        html: `Please connect to Metamask on the <a href="/withdraw">Withdraw Token</a> page and try again`,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonColor: "#5100FF",
        confirmButtonText: "Close",
        footer: val ? `<p class="text-center"> ${val}</p>` : "",
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

export function signingErrorHandler(err, more) {
    return swal.fire({
        title: "Signing Failure",
        text: err.toString(),
        allowOutsideClick: false,
        icon: "error",
        confirmButtonColor: "#5100FF",
        confirmButtonText: "Okay",
        footer: more ? `<p class="text-center">${more}</p>` : "",
    });
}

export function invalidAvtAmountHandler(tokenType) {
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
        text: "AvN recipient account must be a valid SS58 address",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonColor: "#5100FF",
        confirmButtonText: "Okay",
    });
}

export function invalidSubstrateSignature() {
    return swal.fire({
        title: "Invalid Signature",
        text: "The signature could not be generated correctly. Please try, again!",
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

export function networkErrorHandler(err) {
    return swal.fire({
        title: "Unsupported Ethereum Network",
        text: err,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
        confirmButtonColor: "#5100FF",
    });
}

export function gatewayAccessError() {
    return swal.fire({
        title: "AvN Gateway Access Block",
        html: `You need to have at least 1 AVT in your balance <strong> on this network </strong> to access the Gateway for this network.`,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
        confirmButtonColor: "#5100FF",
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
