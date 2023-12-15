import { metamaskConnectionErrorHandler } from "../errorPopups/walletErrorPopups";
import { transactionErrorHandler } from "../errorPopups/TxErrorPopups";
import { txLinkInAlert } from "../randomFunctions";

// Handles the EVM transaction submission
export async function claimNow({
	leaf,
	merklePath,
	ethereumAccount,
	bridgeContract,
}) {
	merklePath = merklePath.replace(/\[|\]/g, "").split(",");

	if (ethereumAccount) {
		// Calls the claim submit handler to submit the claim transaction and output the result to the user
		try {
			await bridgeContract.methods
				.lower(leaf, merklePath)
				.send({ from: ethereumAccount })
				.on("transactionHash", (hash) => {
					txLinkInAlert({ hash });
				})
				.catch((e) => {
					transactionErrorHandler(e.message);
				});
		} catch (err) {}
	} else {
		metamaskConnectionErrorHandler();
	}
}
