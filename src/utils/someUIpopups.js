import swal from "sweetalert2";
import clipboard from "../assets/img/clipboard.svg";
import { copyUUID, copyTxDetails } from "./randomFunctions";

export const userBalance = async (type, res) => {
    await swal.fire({
        title: `${type} Balance`,
        text: res,
        allowOutsideClick: false,
        icon: "info",
        confirmButtonText: "Okay",
        footer:
            type === "Token"
                ? "Confirm the decimals for this token on the token's Ethereum smart contract"
                : "Values shown are in 18 decimals and not whole values.",
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
        footer: feeMessage,
    });
    return result;
}

export async function transactionSubmitted(id) {
    await swal.fire({
        title: `Transaction Submitted`,
        text: "Please wait a few seconds to find out the status of your transaction. You can save the UUID below.",
        allowOutsideClick: false,
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
        footer: `UUID: ${id} <button class="gear-button" onClick={${copyUUID(
            id
        )}}><img src=${clipboard} alt=""></img></button>`,
    });
}

export async function showUserTransactionStatus(polledState) {
    if (polledState.status === "Processed") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Lower transaction processed successfully. Check if it's ready to be withdrawn on Ethereum on the 'Withdraw' page in 24 hours.",
            allowOutsideClick: false,
            confirmButtonText: "Okay",
            icon: "success",
            footer: `<button onClick={${copyTxDetails(
                polledState.txHash
            )}}><img src=${clipboard} alt=""></img></button>`,
        });
        return null;
    } else if (polledState.status === "Rejected") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Your transaction to lower has was rejected by the AvN parachain.",
            confirmButtonText: "Okay",
            showConfirmButton: false,
            allowOutsideClick: false,
            icon: "error",
            footer: `BlockNumber: <strong>${polledState.blockNumber}</strong>, TxIndex: <strong>${polledState.transactionIndex}</strong>`,
            // TODO implement a copy function to allow the user copy the transaction hash to their system clipboard.
            // , TxHash: <button class="gear-button" onClick={${copyTxDetails(
            //     polledState.txHash
            // )}}><img src=${clipboard} alt=""></img></button>`,
        });
        return null;
    } else if (polledState.status === "Transaction not found") {
        swal.fire({
            title: polledState.status,
            showCloseButton: true,
            text: "Your transaction was not found. Please ensure, you are querying the correct network.",
            allowOutsideClick: false,
            confirmButtonText: "Okay",
            icon: "info",
        });
        return null;
    }
}
