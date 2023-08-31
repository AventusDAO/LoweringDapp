import swal from "sweetalert2";
import { contractLink, confirmNetwork } from "./randomFunctions";
import {
    substrateConnectFailure,
    genericErrorHandlerTemplate,
    metamaskConnectionErrorHandler,
} from "./errorHandlers";
import { amountChecker } from "./ethereumFunctions/decimalHandler";

// for erc20 and 777 tokens
export async function ercConfirmLowerDetails({
    aventusUserAddress,
    ethereumAccount,
    tokenType,
    tokenAddress,
    amount,
    t1Recipient,
    networkId,
    networkState,
    isERC20,
    isERC777,
}) {
    if (aventusUserAddress) {
        if (!ethereumAccount) {
            metamaskConnectionErrorHandler(
                "Metamask is required to confirm the token details"
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
                const _amount = await amountChecker({
                    amount,
                    tokenAddress,
                    isERC20,
                    isERC777,
                });
                if (_amount) {
                    const { isConfirmed: userChoice } = await swal.fire({
                        title: "Confirm details",
                        html: `<small>Lower ${amount} <a href=${contractLink(
                            networkId,
                            tokenAddress
                        )} target="_blank"> ${tokenType} </a> to ${t1Recipient} ?</small>`,
                        showDenyButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Yes",
                        allowOutsideClick: false,
                        denyButtonText: "No",
                        confirmButtonColor: "green",
                        footer: `<strong>full decimal value</strong>:&nbsp${_amount}`,
                    });
                    return { userChoice, _amount };
                } else {
                    if (isERC20) {
                        genericErrorHandlerTemplate(
                            "Cannot Find Token Contract",
                            "Please confirm this token exists on your chosen Ethereum network.",
                            "Only Ethereum mainnet and Goerli contracts are supported."
                        );
                    } else {
                        genericErrorHandlerTemplate(
                            "Is not ERC777",
                            "Please confirm that this token's contract exists on your chosen Ethereum network and is ERC777 standard.",
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
        title: "Signature Required",
        text: "Sign to validate your AvN account",
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: "Sign",
        denyButtonText: "Don't Sign",
        confirmButtonColor: "green",
        footer: "This operation is free",
    });
    return result ? result : "";
}

// for avt and eth tokens
export async function confirmLowerDetails({
    aventusUserAddress,
    tokenType,
    tokenAddress,
    amount,
    t1Recipient,
    networkId,
}) {
    if (aventusUserAddress) {
        const _amount = await amountChecker({
            amount,
            tokenAddress,
            isERC20: false,
            isERC777: false,
        });
        const { isConfirmed: userChoice } = await swal.fire({
            title: "Confirm details",
            html: `<small>Lower ${amount} <a href=${contractLink(
                networkId,
                tokenAddress
            )} target="_blank"> ${tokenType} </a> to ${t1Recipient} ?</small>`,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes",
            allowOutsideClick: false,
            denyButtonText: "No",
            confirmButtonColor: "green",
            footer: `<strong>full decimal value</strong>:&nbsp${_amount}`,
        });
        return { userChoice, _amount };
    } else {
        substrateConnectFailure();
    }
}
