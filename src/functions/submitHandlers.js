import {
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
    substrateConnectFailure,
} from "./errorHandlers";
import swal from "sweetalert2";
import sendTransaction from "./constructTxParams";
import fullDecimalAmount from "./decimalHandler";
import { checkRequestId } from "./pollTransaction";
import { toAddress } from "./polkadotToAddress";

/*
This file handles the lower transactions for all four lower options.
Also handles the withdrawal of tokens on ethereum using the lower data returned from the backend.
*/

async function lowerSubmitHandler(
    sender,
    token,
    token_amount,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER
) {
    const _token_amount = token_amount;
    // const _token_amount = await fullDecimalAmount(token_amount);
    const params = {
        relayer: AVN_RELAYER,
        user: sender.address,
        payer: sender.address,
        t1Recipient,
        token: token,
        amount: _token_amount,
        proxySignature: "",
        feePaymentSignature: "",
        paymentNonce: "",
    };

    if (!sender.address) {
        substrateConnectFailure();
    } else {
        const method = "proxyTokenLower";
        try {
            const request_id = await sendTransaction(
                sender,
                params,
                method,
                AVN_GATEWAY_URL
            );
            if (request_id) {
                await checkRequestId(request_id, sender, AVN_GATEWAY_URL);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

function txLinkInAlert(networkId, hash, type) {
    const etherscan_link =
        networkId === 1
            ? "https://etherscan.io/tx/"
            : "https://rinkeby.etherscan.io/tx/";

    swal.fire({
        title: "Great!",
        text: `Your ${type} will arrive approximately 20 minutes after the lift transaction succeeds. <br> <a href="${etherscan_link}${hash}" target="_blank">View lift transaction on Etherscan</a>`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Close",
    });
}

// Handles the ethereum transaction submission
async function withdrawSubmitHandler(
    account,
    leaf,
    merklePath,
    avn_contract,
    networkId
) {
    if (!account) {
        metamaskConnectionErrorHandler();
    } else {
        await avn_contract.methods
            .lower(leaf, merklePath)
            .send({ from: account })
            .on("transactionHash", (hash) => {
                txLinkInAlert(networkId, hash, "ETH");
            })
            .catch((e) => {
                transactionErrorHandler(e.message);
            });
    }
}

export { lowerSubmitHandler, withdrawSubmitHandler };
