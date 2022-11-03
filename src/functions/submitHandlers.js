import {
    metamaskConnectionErrorHandler,
    transactionErrorHandler,
    substrateConnectFailure,
} from "./errorHandlers";
import swal from "sweetalert2";
import sendTransaction from "./constructTxParams";

async function lowerSubmitHandler(
    sender,
    token,
    token_amount,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER
) {
    const params = {
        relayer: AVN_RELAYER,
        user: sender.address,
        payer: sender.address,
        t1Recipient,
        token: token,
        amount: token_amount,
        proxySignature: "",
        feePaymentSignature: "",
        paymentNonce: "",
    };

    if (!sender.address) {
        substrateConnectFailure();
    } else {
        const method = "proxyTokenLower";
        try {
            sendTransaction(sender, params, method, AVN_GATEWAY_URL);
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

async function querySubmitHandler(requestId, account, avn_contract, networkId) {
    // if ((await checkRequestId(requestId, account, url)) === "Processed") {
    //     console.log("Ready to fetch from scraper");
    const leaf =
        "0x05038400a2a7505cdfc301230d8eb3bec873bb39893ba7f83f69ed8c3afb6712ffbf3a0e01ca1410101c63abacb07cfa0bd2f5bdf52b758b666e56b803b233f93adea36739262164327cb7547a3a71b682a1188a5821253ec59d51ebac13d818c2ebf8318db60600002702a2a7505cdfc301230d8eb3bec873bb39893ba7f83f69ed8c3afb6712ffbf3a0e46a1a476d02f4a79b7a38fa0863a954ae252251d000064a7b3b6e00d00000000000000006c9a8c64d0681bf2bb474babd345115ee4139ecb";
    const merklePath = [
        0xfa8b6491e13ed9ee049e879caebc2eb42862a1fd6c880228968ec373ad4a0be4,
        0x3bc8f092d388f0fad3b06acc04fb91849c66dfe8ff629c2cd56991f11e350ae2,
        0x10dbc1d5a438c682bfa4f189f9b8d91421c87d4b4f7d7ee0505881e36389015b,
        0x8ffaa44a5376ff9b1f95b9d449281daf9182b969c36e068091ca6c5a4144c6fb,
        0x55a422edf2fe5437760c1a181650eceedab63f47e0ab854e23ba186db484242c,
        0x214e8bf7ff2564a0ed11da930cf784a6e1edea1b44f57603440e50560c880a63,
        0x9aa0934e6333bf13e0b27e8dcbe1e5d11bbf33282781f1f7f07743221806b48e,
        0xb7fdb7e54e095ca247ccb15be7fdeb9767a3f034f589ffef7092261b9cf07986,
        0x5915b9ae76a00822f6eb1ae0017c521df0144580ccb0bb43a965a827d5b96bea,
        0xb2ec9d0013b93152c102b9265012c2dbb5759410a9d79119bf1f6d89872efc92,
        0xac2b4c40a45021caf6e0c7a6cc8e19b5c8d50054663d4c8a78efc079c379d169,
        0xc2b8db1fe8eada8f582198d191f9140f255929a5182960913d5d4bd4608ecee7,
        0x9280c6e94fa875cf6af427eef70f14ec6e1157a0d1088bb1f31755a8eeb3cb6e,
        0x708e9f1e0e4ba06f7f29f8b66ded0468c5a3bc525b20cfda4809713118c82e94,
        0xcde3b21ec35e0e6d0161264ced63be914c1138fdc8ad3d379424815fe7664b3f,
        0xc248aa3ff4381137e82e6084116aa9cccc0b29858de31fe3bccbad5c7652884a,
        0xcd4e856b900ac659004497991a612bb435f798e03636c4cef0db80eb7eaa26eb,
    ];

    console.log(requestId, account, avn_contract, networkId);

    if (requestId) {
        swal.fire({
            title: "Your Lower is Ready!",
            showCloseButton: true,
            text: "You can now withdraw your tokens on Ethereum by clicking the button below.",
            icon: "success",
            showDenyButton: true,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: "Withdraw",
            denyButtonText: `Don't Withdraw`,
        }).then((result) => {
            if (result.isConfirmed) {
                withdrawSubmitHandler(
                    account,
                    leaf,
                    merklePath,
                    avn_contract,
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

async function withdrawSubmitHandler(
    account,
    leaf,
    merklePath,
    avn_contract,
    networkId
) {
    console.log("withdraw submit handler");
    console.log(account, leaf, merklePath, avn_contract);

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

export { querySubmitHandler, lowerSubmitHandler, withdrawSubmitHandler };
