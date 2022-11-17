import swal from "sweetalert2";
import { substrateConnectFailure } from "./errorHandlers";
import { signAndSendMessage } from "./signAndSendMessage";
import { queryJsonRpcRequest } from "./jsonRpcRequest";

async function balanceHandler(account, token, method, AVN_GATEWAY_URL) {
    const url = `${AVN_GATEWAY_URL}query`;
    const params = {
        accountId: account.address,
        token: token,
    };
    if (!account.address) {
        substrateConnectFailure();
    } else {
        swal.fire({
            title: "Need Your Signature!",
            text: "This signature will authenticate you to query the balance of your account",
            confirmButtonText: "Sign",
            showDenyButton: true,
            denyButtonText: "Don't Sign",
        }).then((result) => {
            if (result.isConfirmed) {
                signAndSendMessage(account, params, method, url);
            }
        });
    }
}

async function basicQueryHandler(account, method, AVN_GATEWAY_URL) {
    const url = `${AVN_GATEWAY_URL}query`;
    const params = {
        accountId: account.address,
    };
    if (!account.address) {
        substrateConnectFailure();
    } else {
        await signAndSendMessage(account, params, method, url);
    }
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRequestId(requestId, sender, url) {
    for (let i = 0; i < 10; i++) {
        await sleep(3000);
        const params = { requestId };
        const polledState = await queryJsonRpcRequest(
            sender,
            url,
            "requestState",
            params
        );
        if (polledState.status === "Processed") {
            swal.fire({
                title: polledState.status,
                showCloseButton: true,
                text: "Your transaction to lower has been processed successfully by the AvN blockchain.",
                confirmButtonText: "Okay",
                icon: "success",
            });
            return "Processed";
        } else if (polledState.status === "Rejected") {
            swal.fire({
                title: polledState.status,
                showCloseButton: true,
                text: "Your transaction to lower has was rejected by the AvN blockchain.",
                confirmButtonText: "Okay",
                icon: "error",
            });
            break;
        } else if (polledState.status === "Transaction not found") {
            console.log("Transaction not found");
            swal.fire({
                title: polledState.status,
                showCloseButton: true,
                text: "Your transaction was not found. Please ensure, you are querying the correct network.",
                confirmButtonText: "Okay",
                icon: "info",
            });
            break;
        }
    }
}

export { balanceHandler, basicQueryHandler, checkRequestId };
