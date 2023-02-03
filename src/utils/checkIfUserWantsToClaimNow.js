import swal from "sweetalert2";
import { claimSubmitHandler } from "./ethereumFunctions/claimSubmitHandler";
import { confirmNetwork } from "./randomFunctions";
import { genericErrorHandlerTemplate } from "./errorHandlers";

// Checks if the user would like to claim the tokens ready to be lowered.
async function checkIfUserWantsToClaimNow(
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
            title: "Claim funds on Ethereum",
            showCloseButton: true,
            icon: "success",
            showDenyButton: true,
            confirmButtonColor: "#5100FF",
            allowOutsideClick: false,
            confirmButtonText: "Claim now",
            denyButtonText: `Maybe later`,
        }).then((result) => {
            // Calls the claim submit handler to submit the claim transaction and output the result to the user
            if (result.isConfirmed) {
                const networkChecker = confirmNetwork(networkId, networkState);
                if (!networkChecker) {
                    genericErrorHandlerTemplate(
                        "Switch Ethereum Network",
                        "Please ensure your wallet's Ethereum network is set to Mainnet for AvN Mainnet and Goerli Testnet for AvN Testnet."
                    );
                } else {
                    claimSubmitHandler(
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

export { checkIfUserWantsToClaimNow };
