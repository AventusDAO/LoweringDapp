import swal from "sweetalert2";
import { capitaliseFirstLetter } from "./randomFunctions";

function substrateNotDetected(name) {
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
        confirmButtonText: `<a href=${url} target="_blank">Download ${name}</a>`,
        icon: "error",
        footer: "If the wallet is installed, confirm this dapp is approved to access the wallet from within Manage Website Access in the extension.",
    });
}

function lowerError(err) {
    return swal.fire({
        title: "Lower Status",
        text: err,
        allowOutsideClick: false,
        icon: "info",
        confirmButtonText: "Okay",
    });
}

function substrateConnectFailure() {
    swal.fire({
        title: "Substrate wallet not connected!",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Close",
    });
}

function metamaskMissingErrorHandler() {
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

function metamaskConnectionErrorHandler() {
    swal.fire({
        title: "Metamask not connected!",
        text: "Please connect to Metamask and try again",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Close",
    });
}

function transactionErrorHandler(err) {
    return swal.fire({
        title: "Transaction Failure",
        text: err.toString(),
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function invalidAvtAmountHandler(tokenType) {
    return swal.fire({
        title: "Invalid Token",
        text: `Must be a valid ${tokenType} token existing on this network`,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function invalidAddressErrorHandler() {
    return swal.fire({
        title: "Invalid Recipient",
        text: "AvN recipient account must be a valid SS58 address",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function invalidSubstrateSignature() {
    return swal.fire({
        title: "Invalid Signature",
        text: "The signature could not be generated correctly. Please try, again!",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function isZeroErrorHandler() {
    return swal.fire({
        title: "Invalid Amount",
        text: "Amount cannot be zero",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function networkErrorHandler(err) {
    return swal.fire({
        title: "Unsupported Network",
        text: err,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function gatewayAccessError() {
    return swal.fire({
        title: "AvN Gateway Access Block",
        text: "You need to have at least 1 AVT in your balance to access the Gateway on this network.",
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

function invalidTokenErrorHandler(tokenType) {
    return swal.fire({
        title: "Invalid Token",
        text: `Must be a valid ${tokenType} token existing on this network`,
        allowOutsideClick: false,
        icon: "error",
        confirmButtonText: "Okay",
    });
}

export {
    metamaskMissingErrorHandler,
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
    invalidTokenErrorHandler,
    invalidAvtAmountHandler,
    invalidAddressErrorHandler,
    isZeroErrorHandler,
    networkErrorHandler,
    substrateNotDetected,
    lowerError,
    invalidSubstrateSignature,
    substrateConnectFailure,
    gatewayAccessError,
};
