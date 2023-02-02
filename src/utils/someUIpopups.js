import swal from "sweetalert2";

export const userBalance = async (type, fullAmount, decAmount) => {
    await swal.fire({
        title: `${type} Balance`,
        text: decAmount,
        allowOutsideClick: false,
        icon: "info",
        confirmButtonColor: "#5100FF",
        confirmButtonText: "Okay",
        footer: `<p class="text-center">${
            type === "Token"
                ? "Confirm the decimals for this token on the token's Ethereum smart contract"
                : `<strong>full decimal value</strong>: ${fullAmount}`
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
            title: "Lower Succeeded",
            showCloseButton: true,
            text: "Funds will be claimable on Ethereum within 24 hours",
            allowOutsideClick: false,
            confirmButtonColor: "#ffffff",
            confirmButtonText: `<a href="${explorerTxUrl}${polledState.txHash}" target="_blank">View transaction on AvN Explorer</a>`,
            icon: "success",
        });
        return null;
    } else if (polledState.status === "Rejected") {
        swal.fire({
            title: "Lower failed",
            showCloseButton: true,
            text: "The transaction was rejected by the AvN, please check the details and retry",
            confirmButtonColor: "#ffffff",
            confirmButtonText: `<a href="${explorerLink}${polledState.txHash}" target="_blank">View transaction on AvN Explorer</a>`,
            allowOutsideClick: false,
            icon: "error",
        });
        return null;
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
        return null;
    }
}
