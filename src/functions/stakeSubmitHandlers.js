import {
    isZeroErrorHandler,
    transactionErrorHandler,
    polkadotConnectFailure,
    invalidAvtAmountHandler,
    stakingError,
} from "./errorHandlers";
import {
    web3Enable,
    web3FromSource,
    web3AccountsSubscribe,
} from "@polkadot/extension-dapp";
import swal from "sweetalert2";
import AVN_API from "avn-api";
import fullDecimalAmount from "./decimalHandler";
import tryGetAvnAccountAddress from "./polkaKey";
import generateAwtPayload from "./generateAwt";
import axios from "axios";
import useFetchForGateway from "../components/Extras/useFetchForGateway";
const pub_testnet_relayer = "5EcAFwVcBo8s2D3ZSTnx2sq49wVDF3rc1yGJMx5nRp2GsK62";

async function signAndSendMessage(account, AVN_GATEWAY_URL, relayer) {
    const API = new AVN_API();
    await API.init();
    const suffix = "query";
    const method = "getAvtBalance";
    const params = {
        accountId: account.address,
    };

    console.log("About to start");
    const url = `${AVN_GATEWAY_URL}${suffix}`;
    // const jsonResult = useFetchForGateway(account, url, method, params);

    // const data = {
    //     address: account.address,
    //     signature: payload.sig,
    // };
}

async function stakeAvtHandler(account) {
    if (!account.address) {
        polkadotConnectFailure();
    } else {
        console.log("StakeAvtHandler");
        try {
            signAndSendMessage(
                account,
                "https://testnet.gateway.aventus.io/",
                pub_testnet_relayer
            );
        } catch (e) {
            console.error(e);
        }
    }
}

async function unStakeHandler(account, amountToUnstake) {
    const _avtAmount = await fullDecimalAmount(amountToUnstake);

    // if (!account) {
    //     polkadotConnectFailure();
    // } else if (!_avtAmount) {
    //     invalidAvtAmountHandler("ERC20");
    // } else if (_avtAmount.isZero()) {
    //     isZeroErrorHandler();
    // } else {
    //     await API.send
    //         .unstake(AVN_RELAYER, amountToUnstake)
    //         .on("transactionHash", () => {
    //             swal.fire({
    //                 title: "Great!",
    //                 text: "One more Metamask transaction will open shortly",
    //                 closeOnClickOutside: false,
    //                 icon: "success",
    //                 button: "Okay!",
    //             });
    //         })
    //         .catch((e) => {
    //             transactionErrorHandler(e.message);
    //         });
    // }
}

function txLinkInAlert(networkId, hash, type) {
    const etherscan_link =
        networkId === 1
            ? "https://etherscan.io/tx/"
            : "https://rinkeby.etherscan.io/tx/";
    const link = document.createElement("div");
    link.innerHTML = `<a href="${etherscan_link}${hash}" target="_blank">View lift transaction on Etherscan</a>`;

    swal.fire({
        title: "Great!",
        text: `Your ${type} will arrive approximately 20 minutes after the lift transaction succeeds`,
        content: link,
        closeOnClickOutside: false,
        icon: "success",
        button: "Close",
    });
}

// async function checkRequestId(requestId) {
//     for (let i = 0; i < 10; i++) {
//         await sleep(3000);
//         const params = { requestId };
//         console.log(`i==, ${i}`);
//         const polledState = await jsonRpcRequest(
//             "poll",
//             "requestState",
//             params
//         );
//         if (polledState.status === "Processed") {
//             console.log("Transaction processed");
//             break;
//         } else if (polledState.status === "Rejected") {
//             console.log("Transaction failed");
//             break;
//         }
//     }
// }

// async function queryState(account, url, method, params) {
//     console.log("chinaza");
//     const fullUrl = `${url}query`;
//     const queryResponse = await jsonRpcRequest(
//         account,
//         fullUrl,
//         method,
//         params
//     );
//     return queryResponse;
// }

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { stakeAvtHandler, unStakeHandler };
