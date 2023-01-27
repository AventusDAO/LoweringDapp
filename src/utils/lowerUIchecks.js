import swal from "sweetalert2";
import { contractLink, confirmNetwork } from "./randomFunctions";
import {
    substrateConnectFailure,
    genericErrorHandlerTemplate,
    metamaskConnectionErrorHandler,
} from "./errorHandlers";
import { tokenAmountChecker } from "./ethereumFunctions/decimalHandler";

// for erc20 and 777 tokens
export async function ercConfirmLowerDetails(
    senderAddress,
    account,
    tokenType,
    tokenAddress,
    amount,
    networkId,
    networkState,
    isERC20,
    isERC777
) {
    if (senderAddress) {
        if (!account) {
            metamaskConnectionErrorHandler(
                "Metamask is required to confirm the token contract's details."
            );
        } else {
            const networkChecker = confirmNetwork(networkId, networkState);
            if (!networkChecker) {
                genericErrorHandlerTemplate(
                    "Switch Ethereum Network",
                    "Please ensure your Ethereum wallet network is set to Mainnet for Aventus Mainnet and GOERLI for other Aventus networks.",
                    "Metamask is required to confirm the token contract's details."
                );
            } else {
                const _tokenAmount = await tokenAmountChecker(
                    amount,
                    tokenAddress,
                    isERC20,
                    isERC777
                );
                if (_tokenAmount) {
                    const { isConfirmed: userChoice } = await swal.fire({
                        title: "Confirm",
                        text: `You would like to lower ${amount} ${tokenType} token.`,
                        showDenyButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Yes",
                        allowOutsideClick: false,
                        denyButtonText: "No",
                        showCancelButton: true,
                        cancelButtonText: `<a href=${contractLink(
                            networkId,
                            tokenAddress
                        )} target="_blank" style=color:white> View Token Contract </a>`,
                        confirmButtonColor: "green",
                        footer: `<strong>wei value:</strong> ${_tokenAmount}`,
                    });
                    return { userChoice, _tokenAmount };
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
    } else {
        substrateConnectFailure();
    }
}

export async function userSignatureConfirmation() {
    const { isConfirmed: result } = await swal.fire({
        title: "Signature required",
        text: "Sign to validate your AvN account",
        allowOutsideClick: false,
        showDenyButton: true,
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: "This operation is free",
    });
    return result ? result : "";
}

// for avt and eth tokens
export async function confirmLowerDetails(
    senderAddress,
    tokenType,
    tokenAddress,
    amount,
    networkId
) {
    if (senderAddress) {
        const _tokenAmount = await tokenAmountChecker(
            amount,
            tokenAddress,
            false,
            false
        );
        const { isConfirmed: userChoice } = await swal.fire({
            title: "Confirm",
            text: `You would like to lower ${amount} ${tokenType} token.`,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes",
            allowOutsideClick: false,
            denyButtonText: "No",
            showCancelButton: tokenType !== "ETH" ? true : false,
            cancelButtonText: `<a href=${contractLink(
                networkId,
                tokenAddress
            )} target="_blank" style=color:white> View Token Contract </a>`,
            confirmButtonColor: "green",
            footer: `<strong>wei value:</strong> ${_tokenAmount}`,
        });
        return { userChoice, _tokenAmount };
    } else {
        substrateConnectFailure();
    }
}
