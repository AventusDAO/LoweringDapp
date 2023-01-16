import swal from "sweetalert2";
import { substrateConnectFailure } from "./errorHandlers";

export async function confirmLowerDetails(
    senderAddress,
    tokenType,
    tokenAddress,
    amount
) {
    if (senderAddress) {
        const { isConfirmed: userChoice } = await swal.fire({
            title: "Confirm",
            text: `You would like to lower ${amount} ${tokenType} token.`,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes",
            allowOutsideClick: false,
            denyButtonText: "No",
            confirmButtonColor: "green",
            footer: `${tokenType}: ${tokenAddress}`,
        });
        return userChoice;
    } else {
        substrateConnectFailure();
    }
}

export async function userSignatureConfirmation() {
    const { isConfirmed: result } = await swal.fire({
        title: "Need Your Signature!",
        text: "This signature will authenticate you and generate the AWT token unique to your account",
        allowOutsideClick: false,
        showDenyButton: true,
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: "You do not pay for this operation",
    });
    return result ? result : "";
}
