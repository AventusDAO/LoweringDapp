import Web3 from "web3";
import { metamaskMissingErrorHandler } from "./errorHandlers";

async function LoadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        return window.web3;
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        return window.web3;
    } else {
        metamaskMissingErrorHandler();
    }
}
export default LoadWeb3;
