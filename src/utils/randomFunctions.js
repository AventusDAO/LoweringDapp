import { userBalance } from "./someUIpopups";

export function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addressSlicer(address, num1, num2) {
    return address.slice(0, num1) + "..." + address.slice(num2);
}

export const balanceFormatter = (type, res) => {
    if (type === "AVT") {
        if (res.result.length > 18) {
            const v = res.result.length - 18;
            const bal = res.result.slice(0, v) + "." + res.result.slice(v);
            return userBalance(type, bal);
        } else return userBalance(type, res.result);
    } else return userBalance(type, res.result);
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
