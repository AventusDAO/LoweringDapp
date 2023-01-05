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
        html: `Your ${type} will arrive in your account immediately if the lower transaction succeeds. <br> <a href="${etherscanLink}${hash}" target="_blank">View lift transaction on Etherscan</a>`,
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
    // const token = "0x8Fa6cD9A275506D719C434335c0C9FfD15e05A87";
    // const pub = "0x8Fa6cD9A275506D719C434335c0C9FfD15e05A87";
    // const am = 1;
    if (!account) {
        metamaskConnectionErrorHandler();
    } else {
        // swal.fire("Withdraw started", "", "success");
        // console.log(typeof leaf, merklePath);
        try {
            await avnContract.methods
                .lower(leaf, merklePath)
                // .lift(token, pub, am)
                .send({ from: account })
                // .then(console.log)
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
