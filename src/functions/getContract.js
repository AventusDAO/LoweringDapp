import LoadWeb3 from "./loadWeb3";
import ABI from "../config/abi.json";

async function getContract(address) {
    const load = await LoadWeb3();
    const tokenContract = new load.eth.Contract(ABI, address);
    return tokenContract;
}

export default getContract;