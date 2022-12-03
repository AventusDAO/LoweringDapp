import swal from "sweetalert2";
import { toAddress } from "./polkadotToAddress";
import { withdrawSubmitHandler } from "./submitHandlers";

// Calls the withdraw submit handler to submit the withdraw transaction and output the result to the user
async function backendQueryHandler(
    address,
    leaf,
    merklePath,
    account,
    avnContract,
    networkId
) {
    await toAddress(address);

    if (address) {
        swal.fire({
            title: "Your Lower is Ready!",
            showCloseButton: true,
            text: "You can now withdraw your tokens on Ethereum by clicking the button below.",
            icon: "success",
            showDenyButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Withdraw",
            denyButtonText: `Don't Withdraw`,
        }).then((result) => {
            if (result.isConfirmed) {
                withdrawSubmitHandler(
                    account,
                    leaf,
                    merklePath,
                    avnContract,
                    networkId
                );
                swal.fire("Withdraw started", "", "success");
            } else if (result.isDenied) {
                swal.fire({
                    allowOutsideClick: false,
                    confirmButtonText: "I've saved it!",
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

export { backendQueryHandler };
