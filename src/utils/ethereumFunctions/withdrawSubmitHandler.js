import {
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
} from "../errorHandlers";
import { txLinkInAlert } from "../randomFunctions";

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
                    txLinkInAlert(networkId, hash, "token");
                })
                .catch((e) => {
                    transactionErrorHandler(e.message);
                    console.log(e);
                });
        } catch (err) {
            console.error(err.message);
        }
    }
}
