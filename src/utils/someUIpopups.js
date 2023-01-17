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
                : `<strong>wei value</strong>: ${fullAmount}`
        }
                    </p>`,
    });
};

export async function userConfirmation(message, feeMessage) {
    const { isConfirmed: result } = await swal.fire({
        title: "Need Your Signature!",
        text: `This signature will authenticate you ${message}`,
        showDenyButton: true,
        allowOutsideClick: false,
        icon: "info",
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: `<p class="text-center">${feeMessage}</p>`,
    });
    return result;
}

export async function transactionSubmitted(id) {
    await swal
        .fire({
            title: `Transaction Submitted`,
            text: "Please wait a few seconds to find out the status of your transaction. You can save the UUID below.",
            allowOutsideClick: false,
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Copy UUID",
            confirmButtonColor: "#5100FF",
            showCloseButton: true,
            footer: `UUID: ${id}`,
        })
        .then(() => {
            navigator.clipboard.writeText(id);
        });
}

export async function showUserTransactionStatus(polledState) {
    if (polledState.status === "Processed") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Lower transaction processed successfully. Check if it's ready to be withdrawn on Ethereum on the 'Withdraw' page in 24 hours.",
            allowOutsideClick: false,
            confirmButtonColor: "#5100FF",
            confirmButtonText: "Copy Transaction Hash",
            icon: "success",
            footer: `BlockNumber: ${polledState.blockNumber}, TxIndex: ${polledState.transactionIndex}`,
        }).then(() => {
            navigator.clipboard.writeText(polledState.txHash);
        });
        return null;
    } else if (polledState.status === "Rejected") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Your transaction to lower has was rejected by the AvN parachain.",
            confirmButtonText: "Copy Transaction Hash",
            confirmButtonColor: "#5100FF",
            showConfirmButton: true,
            allowOutsideClick: false,
            icon: "error",
            footer: `BlockNumber: ${polledState.blockNumber}, TxIndex: ${polledState.transactionIndex}`,
        }).then(() => {
            navigator.clipboard.writeText(polledState.txHash);
        });
        return null;
    } else if (polledState.status === "Transaction not found") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Your transaction was not found. Please ensure, you are querying the correct network.",
            allowOutsideClick: false,
            confirmButtonColor: "#5100FF",
            confirmButtonText: "Okay",
            icon: "info",
        });
        return null;
    }
}
