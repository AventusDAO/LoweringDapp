import { userBalance } from "./someUIpopups";
import balanceConverter from "ethereum-unit-converter";

export function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addressSlicer(address, num1, num2) {
    return address.slice(0, num1) + "..." + address.slice(num2);
}

export const balanceFormatter = (type, res) => {
    if (type === "AVT" || type === "ETH") {
        const resValue = Number(res.result);
        const result = balanceConverter(resValue, "wei", "ether");
        return userBalance(type, res.result, result);
    } else return userBalance(type, res.result, res.result);
};

export function copyUUID(value) {
    const el = document.createElement("input");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

export function copyTxDetails(value) {
    const item = document.createElement("input");
    item.value = value;
    document.body.appendChild(item);
    item.select();
    document.execCommand("copy");
    document.body.removeChild(item);
}

const networks = {
    1: "MAINNET",
    5: { 0: "PUBLIC_TESTNET", 1: "DEV" },
};

export function confirmNetwork(networkId, networkState) {
    if (networkId === 1) {
        if (networkState === networks[networkId]) {
            return true;
        } else {
            return false;
        }
    } else if (networkId === 5) {
        if (
            networkState === networks[networkId][0] ||
            networkState === networks[networkId][1]
        ) {
            return true;
        } else {
            return false;
        }
    }
}
