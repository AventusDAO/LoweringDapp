import swal from "sweetalert2";

export const userBalance = async ({ type, message, decAmount }) => {
    await swal.fire({
        title: `${type} Balance`,
        text: decAmount,
        allowOutsideClick: false,
        icon: "info",
        confirmButtonColor: "#5100FF",
        confirmButtonText: "Okay",
        footer: `<p class="text-center">${
            type === "AVT"
                ? `${message}`
                : type === "TOKEN"
                ? "Confirm the decimals for this token on the token's Ethereum smart contract"
                : ""
        }
                    </p>`,
    });
};

export async function userConfirmation(message, feeMessage) {
    const { isConfirmed: result } = await swal.fire({
        title: "Signature Required",
        text: `Sign to ${message}`,
        showDenyButton: true,
        allowOutsideClick: false,
        icon: "info",
        confirmButtonText: "Sign",
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: `<p class="text-center">${feeMessage}</p>`,
    });
    return result;
}

export async function transactionSubmitted(id) {
    await swal
        .fire({
            title: `AvN Transaction Submitted`,
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

export async function showUserTransactionStatus(polledState, explorerTxUrl) {
    if (polledState.status === "Processed") {
        swal.fire({
            title: "Lower Successful",
            showCloseButton: true,
            text: "Funds will be claimable on Ethereum within 24 hours",
            allowOutsideClick: false,
            confirmButtonColor: "#ffffff",
            confirmButtonText: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on AvN Explorer</a>`,
            icon: "success",
        });
        return "complete";
    } else if (polledState.status === "Rejected") {
        swal.fire({
            title: "Lower failed",
            showCloseButton: true,
            text: "The transaction was rejected by the AvN, please check the details and retry",
            confirmButtonColor: "#ffffff",
            confirmButtonText: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on AvN Explorer</a>`,
            allowOutsideClick: false,
            icon: "error",
        });
        return "complete";
    } else if (polledState.status === "Transaction not found") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Transaction not found. Please ensure you are querying the right network.",
            allowOutsideClick: false,
            confirmButtonColor: "#5100FF",
            confirmButtonText: "Okay",
            icon: "info",
        });
        return "complete";
    }
}

export async function userAWTGeneration() {
    const { isConfirmed: result } = await swal.fire({
        title: "Signature Required",
        text: "Sign to validate your AvN account",
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: "Sign",
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: "This operation is free",
    });
    if (result) {
        const { isConfirmed: hasPayer } = await swal.fire({
            title: "Got A Payer?",
            html: "Is there an <b>Enterprise account</b> designated to pay for your transactions?",
            allowOutsideClick: false,
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            confirmButtonColor: "green",
            footer: "We can still authenticate you if you don't have a payer.",
        });
        return hasPayer;
    }
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
