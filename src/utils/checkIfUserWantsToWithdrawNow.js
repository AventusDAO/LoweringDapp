import swal from "sweetalert2";
import { withdrawSubmitHandler } from "./ethereumFunctions/withdrawSubmitHandler";

// Checks if the user would like to withdraw the tokens ready to be lowered.
async function checkIfUserWantsToWithdrawNow(
    address,
    leaf,
    merklePath,
    account,
    avnContract,
    networkId
) {
    merklePath = merklePath.replace(/\[|\]/g, "").split(",");

    if (address) {
        swal.fire({
            title: "Your Lower is Ready!",
            showCloseButton: true,
            text: "You can now withdraw your tokens on Ethereum by clicking the button below.",
            icon: "success",
            showDenyButton: true,
            confirmButtonColor: "#5100FF",
            allowOutsideClick: false,
            confirmButtonText: "Withdraw",
            denyButtonText: `Don't Withdraw`,
        }).then((result) => {
            // Calls the withdraw submit handler to submit the withdraw transaction and output the result to the user
            if (result.isConfirmed) {
                withdrawSubmitHandler(
                    account,
                    leaf,
                    merklePath,
                    avnContract,
                    networkId
                );
            } else if (result.isDenied) {
                swal.fire({
                    allowOutsideClick: false,
                    confirmButtonText: "I've saved it!",
                    confirmButtonColor: "#5100FF",
                    title: "Save these details",
                    text: JSON.stringify({
                        leaf,
                        merklePath,
                    }),
                });
            }
        });
    } else {
        swal.fire({
            title: "Transaction Not Passed",
            showCloseButton: true,
            text: "Your transaction to lower has NOT been processed successfully by the AvN blockchain.",
            allowOutsideClick: false,
            confirmButtonText: "Close!",
            icon: "info",
        });
    }
}

export { checkIfUserWantsToWithdrawNow };
