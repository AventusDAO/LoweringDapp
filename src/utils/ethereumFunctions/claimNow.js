import { confirmNetwork } from "../randomFunctions";
import {
    genericErrorHandlerTemplate,
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
} from "../errorHandlers";
import { txLinkInAlert } from "../randomFunctions";

// Handles the ethereum transaction submission
export async function claimNow({
    leaf,
    merklePath,
    ethereumAccount,
    avnContract,
    networkId,
    networkState,
}) {
    merklePath = merklePath.replace(/\[|\]/g, "").split(",");

    if (ethereumAccount) {
        // Calls the claim submit handler to submit the claim transaction and output the result to the user
        const networkChecker = confirmNetwork(networkId, networkState);
        if (networkChecker) {
            try {
                await avnContract.methods
                    .lower(leaf, merklePath)
                    .send({ from: ethereumAccount })
                    .on("transactionHash", (hash) => {
                        txLinkInAlert(networkId, hash, "tokens");
                    })
                    .catch((e) => {
                        transactionErrorHandler(e.message);
                    });
            } catch (err) {}
        } else {
            genericErrorHandlerTemplate(
                "Switch Ethereum Network",
                "Please ensure your wallet's Ethereum network is set to Mainnet for AvN Mainnet and Goerli Testnet for AvN Testnet."
            );
        }
    } else {
        metamaskConnectionErrorHandler();
    }
}
