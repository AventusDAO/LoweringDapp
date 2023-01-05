import LoadWeb3 from "./loadWeb3";
import ABI from "../../config/abi.json";
import {
    metamaskMissingErrorHandler,
    metamaskConnectionErrorHandler,
} from "../errorHandlers";

export async function getContract(address) {
    const load = await LoadWeb3();
    const tokenContract = new load.eth.Contract(ABI, address);
    return tokenContract;
}

export async function connectMetamaskButton() {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts;
    } catch (error) {
        if (error.code === 4001) {
            metamaskConnectionErrorHandler();
        } else {
            metamaskMissingErrorHandler();
        }
    }
}
