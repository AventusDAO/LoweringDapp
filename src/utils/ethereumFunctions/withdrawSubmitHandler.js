import {
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
} from "../errorHandlers";
import swal from "sweetalert2";

function txLinkInAlert(networkId, hash, type) {
    const etherscanLink =
        networkId === 1
            ? "https://etherscan.io/tx/"
            : "https://goerli.etherscan.io/tx/";

    swal.fire({
        title: "Great!",
        html: `Your ${type} will arrive in your account immediately if the lower transaction succeeds. <br> <a href="${etherscanLink}${hash}" target="_blank">View lower transaction on Etherscan</a>`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Close",
    });
}

// Handles the ethereum transaction submission
export async function withdrawSubmitHandler(
    account,
    leaf,
    merklePath,
    avnContract,
    networkId
) {
    if (!account) {
        metamaskConnectionErrorHandler();
    } else {
        try {
            await avnContract.methods
                .lower(leaf, merklePath)
                .send({ from: account })
                .on("transactionHash", (hash) => {
                    txLinkInAlert(networkId, hash, "ETH");
                })
                .catch((e) => {
                    transactionErrorHandler(e.message);
                    console.log(e);
                })
                .then(console.log);
        } catch (err) {
            console.error(err.message);
        }
    }
}
