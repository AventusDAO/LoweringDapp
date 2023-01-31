import swal from "sweetalert2";
import { withdrawSubmitHandler } from "./ethereumFunctions/withdrawSubmitHandler";
import { confirmNetwork } from "./randomFunctions";
import { genericErrorHandlerTemplate } from "./errorHandlers";

// Checks if the user would like to withdraw the tokens ready to be lowered.
async function checkIfUserWantsToWithdrawNow(
    address,
    leaf,
    merklePath,
    account,
    avnContract,
    networkId,
    networkState
) {
    merklePath = merklePath.replace(/\[|\]/g, "").split(",");
    if (address) {
        swal.fire({
            title: "Claim your tokens on Ethereum",
            showCloseButton: true,
            icon: "success",
            showDenyButton: true,
            confirmButtonColor: "#5100FF",
            allowOutsideClick: false,
            confirmButtonText: "Claim Now",
            denyButtonText: `Maybe later`,
        }).then((result) => {
            // Calls the withdraw submit handler to submit the withdraw transaction and output the result to the user
            if (result.isConfirmed) {
                const networkChecker = confirmNetwork(networkId, networkState);
                if (!networkChecker) {
                    genericErrorHandlerTemplate(
                        "Switch Ethereum Network",
                        "Please ensure your Ethereum wallet network is set to Mainnet for Aventus Mainnet and GOERLI for other Aventus networks."
                    );
                } else {
                    withdrawSubmitHandler(
                        account,
                        leaf,
                        merklePath,
                        avnContract,
                        networkId
                    );
                }
            }
        });
    } else {
        swal.fire({
            title: "Transaction Not Passed",
            showCloseButton: true,
            text: "Your lower is yet to be processed by the AvN",
            allowOutsideClick: false,
            confirmButtonText: "Close",
            icon: "info",
        });
    }
}

export { checkIfUserWantsToWithdrawNow };
