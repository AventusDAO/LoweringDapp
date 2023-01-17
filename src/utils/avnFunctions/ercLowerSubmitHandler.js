import sendTransaction from "./constructTxParams";
import { tokenAmountChecker } from "../ethereumFunctions/decimalHandler";
import { checkRequestId } from "./pollTransaction";
import {
    metamaskConnectionErrorHandler,
    genericErrorHandlerTemplate,
} from "../errorHandlers";
import { confirmNetwork } from "../randomFunctions";

export async function ercLowerSubmitHandler(
    sender,
    account,
    token,
    tokenAmount,
    t1Recipient,
    AVN_GATEWAY_URL,
    AVN_RELAYER,
    networkId,
    networkState,
    isERC20,
    isERC777
) {
    if (!account) {
        metamaskConnectionErrorHandler(
            "Metamask is required to confirm the token contract's details."
        );
    } else {
        const networkChecker = confirmNetwork(networkId, networkState);
        console.log(networkChecker);
        console.log(networkId, networkState);
        if (!networkChecker) {
            genericErrorHandlerTemplate(
                "Switch Ethereum Network",
                "Please ensure your Ethereum wallet network is set to Mainnet for Aventus Mainnet and GOERLI for other Aventus networks.",
                "Metamask is required to confirm the token contract's details."
            );
        } else {
            const _tokenAmount = await tokenAmountChecker(
                tokenAmount,
                token,
                isERC20,
                isERC777
            );
            if (_tokenAmount) {
                const params = {
                    relayer: AVN_RELAYER,
                    user: sender.address,
                    payer: sender.address,
                    t1Recipient,
                    token: token,
                    amount: _tokenAmount,
                    proxySignature: "",
                    feePaymentSignature: "",
                    paymentNonce: "",
                };

                const method = "proxyTokenLower";
                try {
                    const requestId = await sendTransaction(
                        sender,
                        params,
                        method,
                        AVN_GATEWAY_URL
                    );
                    if (requestId) {
                        await checkRequestId(
                            requestId,
                            sender,
                            AVN_GATEWAY_URL
                        );
                        return "done";
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                if (isERC20) {
                    genericErrorHandlerTemplate(
                        "Cannot Find Token Contract",
                        "Please confirm that this token's contract exists on your chosen Ethereum network.",
                        "Only Ethereum mainnet and Goerli contracts are supported."
                    );
                } else {
                    genericErrorHandlerTemplate(
                        "Cannot Confirm Token is ERC777",
                        "Please confirm that this token's contract exists on your chosen Ethereum network and is an ERC777 token.",
                        "Only Ethereum mainnet and Goerli contracts are supported."
                    );
                }
            }
        }
    }
}
