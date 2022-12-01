import swal from "sweetalert2";
import getToken from "./generateAwtToken";
import { jsonRpcRequest } from "./jsonRpcRequest";

/*
Polls for the state of a transaction
*/

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkRequestId(requestId, sender, url) {
    for (let i = 0; i < 10; i++) {
        await sleep(3000);
        const params = { requestId };
        const awtToken = await getToken(sender);
        const polledState = await jsonRpcRequest(
            awtToken,
            url,
            "poll",
            "requestState",
            params,
            "polling"
        );
        console.log(polledState);
        console.log(polledState.status);
        console.log(polledState.result);
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

export { checkRequestId };
