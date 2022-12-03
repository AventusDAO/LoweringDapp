export function capitaliseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function addressSlicer(address, num1, num2) {
    return address.slice(0, num1) + "..." + address.slice(num2);
}
